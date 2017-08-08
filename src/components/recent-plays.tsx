import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { PlayStore, Play, Player, PlayedGame } from '../stores/plays-store';
import { UIStateStore } from '../stores/ui-state-store';
import * as _ from 'lodash';

@inject("playStore")
@observer
export default class RecentPlays extends React.Component<{ playStore?: PlayStore, visible: boolean }, {}> {
    render() {
        if (this.props.playStore.isLoading) {
            return null;
        }
        let className = "subsection";
        if (!this.props.visible) {
            className += " hidden";
        }
        return (
            <div className={className}>
                <div className="title is-4">
                    Recent Plays
                    <a className="title-link" target="_blank" href="https://boardgamegeek.com/plays/bydate/user/ervwalter/subtype/boardgame"><i className="fa fa-external-link" aria-hidden="true"></i></a>
                </div>
                <GameThumbnails games={this.props.playStore.recentGames} />
                <PlaysTableOrList plays={_.take(this.props.playStore.plays, 15)} />
            </div>
        )
    }
};

class GameThumbnails extends React.Component<{ games: PlayedGame[] }, {}> {
    render() {
        return (
            <div className="thumbnail-list is-hidden-mobile">
                {this.props.games.map((game) => <a href={`https://boardgamegeek.com/boardgame/${game.gameId}/`} target="_blank" key={game.gameId} className="fade-in" ><img src={game.thumbnail} alt={game.name} title={game.name}/></a>)}
            </div>
        )
    }
}

@inject("uiStateStore")
@observer
class PlaysTableOrList extends React.Component<{ plays: Play[], uiStateStore?: UIStateStore }, {}> {
    render() {
        return (
            <div className="recent-plays">
                {this.props.uiStateStore.isMobile ? <PlaysList plays={this.props.plays} /> : <PlaysTable plays={this.props.plays} />}
            </div>
        )
    }
}

class PlaysTable extends React.Component<{ plays: Play[] }, {}> {
    render() {
        return (
            <table className="table is-striped is-hidden-mobile">
                <thead><tr>
                    <th>Date</th>
                    <th>Game</th>
                    <th>Players</th>
                    <th>Location</th>
                </tr></thead>
                <tbody>
                    {this.props.plays.map(play => {
                        return (
                            <tr key={play.playId}>
                                <td><span className="is-hidden-touch">{play.playDate.format("ddd")}, </span>{play.playDate.format("MMM D")}</td>
                                <td className="name"><a target="_blank" href={`https://boardgamegeek.com/boardgame/${play.gameId}/`}>{play.name}</a></td>
                                <td className="players-column"><Players players={play.players} /></td>
                                <td>{play.location}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

class PlaysList extends React.Component<{ plays: Play[] }, {}> {
    render() {
        return (
            <div className="is-hidden-tablet plays-list">
                {this.props.plays.map(play => {
                    return (
                        <div key={play.playId} className="play">
                            <div className="columns is-mobile is-gapless">
                                <div className="column">
                                    <div><a target="_blank" href={`https://boardgamegeek.com/boardgame/${play.gameId}/`}>{play.name}</a></div>
                                </div>
                                <div className="column is-narrow">
                                    {play.playDate.format("MMM D")}
                                </div>
                            </div>
                            <div className="play-details"><Players players={play.players} /> - <span className="location">@{play.location}</span></div>
                        </div>
                    )
                })}
            </div>
        )
    }
}


class Players extends React.Component<{ players: Player[] }, {}> {
    render() {
        let players = _.sortBy(this.props.players, "name");
        let anonymousCount = _.remove(players, p => p.name.toLowerCase() == "anonymous player").length;
        let components: Array<React.ReactNode> = [];
        let maxIndex = players.length - 1;
        if (anonymousCount > 0) {
            maxIndex++;
        }
        players.forEach((player, index) => {
            let className = player.win ? "winner " : "";
            let titles = []
            if (player.win)  titles.push("Winner");
            if (player.new) titles.push("New Player");
            className += player.new ? "new " : "";
            let comma = (index < maxIndex ? "," : "");
            components.push(
                <span className="player" key={player.name}>
                    <span className={className} title={titles.join(" & ")}>{player.name}</span>
                    <span>{comma}&nbsp;</span>
                </span>
            );
        });
        if (anonymousCount > 0) {
            components.push(<span className="player" key="anonymous player">and {anonymousCount} other{anonymousCount > 1 ? 's' : ''}</span>);
        }
        return (
            <div className="players">
                {components}
            </div>
        )
    }
}

