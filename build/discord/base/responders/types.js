/* -------------------- RESPONDER TYPES -------------------- */
// Enum dos tipos de responder
export var ResponderType;
(function (ResponderType) {
    ResponderType["Button"] = "button";
    ResponderType["StringSelect"] = "select.string";
    ResponderType["UserSelect"] = "select.user";
    ResponderType["RoleSelect"] = "select.role";
    ResponderType["ChannelSelect"] = "select.channel";
    ResponderType["MentionableSelect"] = "select.mentionable";
    ResponderType["Modal"] = "modal";
    ResponderType["ModalComponent"] = "modal.component";
    ResponderType["ChannelSelectMenuBuilder"] = "ChannelSelectMenuBuilder";
    ResponderType["ButtonBuilder"] = "ButtonBuilder";
})(ResponderType || (ResponderType = {}));
