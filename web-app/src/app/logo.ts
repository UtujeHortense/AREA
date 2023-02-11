

export interface Logo {
    url: string;
    brand: string;
    role: string;
    //actions: string[];
    actions: action[];
}

export interface action {
    name: string;
    type: ActionEnum;
    informations?: ExtraInfoEnum[];
    nb_fields: number;
    selectName?: string;
    fields?: string[];
    route?: string;
    input_names?: string[];
}

export enum ActionEnum {
    action, Reaction
}

export enum ExtraInfoEnum {
    input, select, Date
}

const action_spotify1: action = { name: "new song from artist", type: ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["artist_name"]}
const action_spotify2: action = { name: "a playlist has been updated", type: ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["playlist id"]}
const action_github1: action = { name: "new commit on", type: ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["repo name"]}
const action_github2: action = { name: "new friend request", type: ActionEnum.action, nb_fields: 0 }
const action_github3: action = { name: "new star", type: ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["repo name"]}
const action_github4: action = { name: "new issue on project", type: ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["repo name"]}
const action_reddit1: action = { name: "new direct message", type: ActionEnum.action, nb_fields: 0 }
const action_reddit2: action = { name: "new follower", type: ActionEnum.action, nb_fields: 0 }
const action_reddit3: action = { name: "new post on subreddit", type: ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["sub name"]}
const action_reddit4: action = { name: "new comment on post", type: ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["post id"]}
const action_twitter1: action = { name: "when a twitter user tweets (by default: you)", type:ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["twitter user"]}
const action_twitter2: action = { name: "when someone @ you", type:ActionEnum.action, nb_fields: 0}
const action_weather1: action = { name: "when temperature changes", type:ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["city name"]}
const action_weather2: action = { name: "when there is high wind", type:ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["city name"]}
const action_weather3: action = { name: "when there is high UV index", type:ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["city name"]}
const action_weather4: action = { name: "when there is high humidity", type:ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["city name"]}
const action_timer1: action = { name: "every XX second", type:ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["number of seconds"]}
const action_timer3: action = { name: "at given date", type:ActionEnum.action, informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["05/26/2013"]}

const reaction_discord1: action = { name: "send message to selected channel", type: ActionEnum.Reaction, route: "discord/dm", informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["message content"]}
const reaction_github1: action = { name: "create issue on project", type: ActionEnum.Reaction, route: "github/issue", informations: [ExtraInfoEnum.input, ExtraInfoEnum.input], nb_fields: 2, input_names: ["repo name", "issue"]}
const reaction_reddit1: action = { name: "new text message", type: ActionEnum.Reaction, route: "reddit/message", informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["message content"] }
const reaction_twitter1: action = { name: "new tweet", type: ActionEnum.Reaction, route: "twitter/reaction/tweet", informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["tweet content"] }
const reaction_spotify1: action = { name: "create a playlist", type: ActionEnum.Reaction, route: "spotify/action/create_playlist", informations: [ExtraInfoEnum.input], nb_fields: 1, input_names: ["playlist name"] }
const reaction_spotify2: action = { name: "play your music", type: ActionEnum.Reaction, route: "spotify/action/play", nb_fields: 0}
const reaction_spotify3: action = { name: "pause your music", type: ActionEnum.Reaction, route: "spotify/action/play", nb_fields: 0}
const reaction_spotify4: action = { name: "return to the previous music", type: ActionEnum.Reaction, route: "spotify/action/play", nb_fields: 0}
const reaction_spotify5: action = { name: "skip the current music", type: ActionEnum.Reaction, route: "spotify/action/play", nb_fields: 0}

export var LOGOS_ACTION: Logo[] = [
    //{ url: "../assets/Spotify_logo.png", brand: "spotify", role: "action", actions: [action_spotify1, action_spotify2]},
    //{ url: "../assets/github-logo.png", brand: "github", role: "action", actions: [action_github1, action_github2, action_github3, action_github4] },
    //{ url: "../assets/reddit-logo.png", brand: "reddit", role: "action", actions: [action_reddit1, action_reddit2, action_reddit3, action_reddit4] },
    { url: "../assets/twitter-logo.png", brand: "twitter", role: "action", actions: [action_twitter1, action_twitter2]},
    { url: "../assets/weather-logo.png", brand: "weather", role: "action", actions: [action_weather1, action_weather2, action_weather3, action_weather4]},
    { url: "../assets/timer-logo.png", brand: "timer", role: "action", actions: [action_timer1, action_timer3]},
];

export var LOGOS_REACTION: Logo[] = [
    { url: "../assets/Spotify_logo.png", brand: "spotify", role: "reaction", actions: [reaction_spotify1, reaction_spotify2, reaction_spotify3, reaction_spotify4, reaction_spotify5]},
    { url: "../assets/discord-logo.png", brand: "discord", role: "reaction", actions: [reaction_discord1] },
    { url: "../assets/github-logo.png", brand: "github", role: "reaction", actions: [reaction_github1]},
    //{ url: "../assets/reddit-logo.png", brand: "reddit", role: "reaction", actions: [reaction_reddit1]},
    { url: "../assets/twitter-logo.png", brand: "twitter", role: "reaction", actions: [reaction_twitter1]},
];