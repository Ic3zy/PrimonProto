/**
 * Updates the position of a user in a group.
 * @param {object} sock - The WhatsApp socket connection.
 * @param {string} groupJid - The JID of the group.
 * @param {string} userJid - The JID of the user to update.
 * @param {string} argm - The action to perform on the user (e.g. "remove" to ban).
 * @returns {Promise<boolean>} - True if the operation was successful, false otherwise.
 */
async function replaceUserPosition(sock, groupJid, userJid, argm) {
	try {
		await sock.groupParticipantsUpdate(groupJid, [userJid], argm);
	} catch (error) {
		return false
	}
}

addCommand({pattern: "^ban ?(.*)", desc:"Allows you to ban a person from the group.", access: "all", onlyInGroups: true}, (async (msg, match, sock, rawMessage) => {
    const groupId = msg.key.remoteJid;

    var admins = await getAdmins(msg, sock, groupId);
    if (!admins.includes(msg.key.participant)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
        
    }

    if (!await checkAdmin(msg, sock, groupId)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
    };


    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        var quotedMessage = msg.message.extendedTextMessage.contextInfo.participant;
        var result = await replaceUserPosition(sock, groupId, quotedMessage, "remove");
    } else if (match[1]) {
        var result = await replaceUserPosition(sock, groupId, match[1].replace("@", "")+"@s.whatsapp.net", "remove")
    } else {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_Please reply to someone or mention them!_", edit: msg.key});
        } else {
            return await sock.sendMessage(groupId, {text: "_Please reply to someone or mention them!_"}, { quoted: rawMessage.messages[0] });
        }
    }

    if (result) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_✅ The person has been successfully banned from the group!_", edit: msg.key});
        } else {
            return await sock.sendMessage(groupId, {text: "_✅ The person has been successfully banned from the group!_"}, { quoted: rawMessage.messages[0] });
        }
    } else {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, an error occurred while trying to ban the user!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, an error occurred while trying to ban the user!_"}, { quoted: rawMessage.messages[0] })
        }
    }
}));

addCommand({pattern: "^add ?(.*)", desc:"Allows you to add a person from the group.", access: "all", onlyInGroups: true}, (async (msg, match, sock) => {
    const groupId = msg.key.remoteJid;
    
    var admins = await getAdmins(msg, sock, groupId);
    if (!admins.includes(msg.key.participant)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
        
    }

    if (!await checkAdmin(msg, sock, groupId)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
    };

    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        var quotedMessage = msg.message.extendedTextMessage.contextInfo.participant;
        var result = await replaceUserPosition(sock, groupId, quotedMessage, "add");
    } else if (match[1]) {
        var result = await replaceUserPosition(sock, groupId, match[1].replace("@", "").replace("+", "").replace(/ /gmi, "") + "@s.whatsapp.net", "add")
    } else {""
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_Please enter a number!_", edit: msg.key});
        } else {
            return await sock.sendMessage(groupId, {text: "_Please enter a number!_"}, { quoted: rawMessage.messages[0] });
        }
    }
    if (result) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_✅ The person has been successfully added to the group!_", edit: msg.key});
        } else {
            return await sock.sendMessage(groupId, {text: "_✅ The person has been successfully added to the group!_"}, { quoted: rawMessage.messages[0] });
        }
    } else {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, an error occurred while trying to add the user! Try this format: add <number wirh country code>_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, an error occurred while trying to add the user! Try this format: add <number wirh country code>_"}, { quoted: rawMessage.messages[0] })
        }
    }
}));

addCommand({pattern: "^promote ?(.*)", desc:"Allows you to make the user an admin in the group.", access: "all", onlyInGroups: true}, (async (msg, match, sock, rawMessage) => {
    const groupId = msg.key.remoteJid;

    var admins = await getAdmins(msg, sock, groupId);
    if (!admins.includes(msg.key.participant)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }   
    }

    if (!await checkAdmin(msg, sock, groupId)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
    };    


    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        var quotedMessage = msg.message.extendedTextMessage.contextInfo.participant;
        var result = await replaceUserPosition(sock, groupId, quotedMessage, "promote");
    } else if (match[1]) {
        var result = await replaceUserPosition(sock, groupId, match[1].replace("@", "").replace("+", "").replace(/ /gmi, "") + "@s.whatsapp.net", "promote")
    } else {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_Please reply to someone or mention them._", edit: msg.key});
        } else {
            return await sock.sendMessage(groupId, {text: "_Please reply to someone or mention them._"}, { quoted: rawMessage.messages[0] });
        }
    }
    if (result) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_✅ The person has been successfully made an admin ✅", edit: msg.key});
        } else {
            return await sock.sendMessage(groupId, {text: "_✅ The person has been successfully made an admin ✅"}, { quoted: rawMessage.messages[0] });
        }
    } else {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, an error occurred while trying to promote the user!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, an error occurred while trying to promote the user!_"}, { quoted: rawMessage.messages[0] })
        }
    }
}));

addCommand({pattern: "^demote ?(.*)", desc:"Allows you to remove the user from admin in the group.", access: "all", onlyInGroups: true}, (async (msg, match, sock) => {
    const groupId = msg.key.remoteJid;

    var admins = await getAdmins(msg, sock, groupId);
    if (!admins.includes(msg.key.participant)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }   
    }

    if (!await checkAdmin(msg, sock, groupId)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
    };
    
    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        var quotedMessage = msg.message.extendedTextMessage.contextInfo.participant;
        var result = await replaceUserPosition(sock, groupId, quotedMessage, "demote");
    } else if (match[1]) {
        var result = await replaceUserPosition(sock, groupId, match[1].replace("@", "").replace("+", "").replace(/ /gmi, "") + "@s.whatsapp.net", "demote")
    } else {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Please reply to someone or mention them!_", edit: msg.key});
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Please reply to someone or mention them!_"}, { quoted: rawMessage.messages[0] });
        }
    }
    if (!result) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, an error occurred while trying to demote the user!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, an error occurred while trying to demote the user!_"}, { quoted: rawMessage.messages[0] })
        }
    } else {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_✅ The person's admin privileges have been successfully removed!", edit: msg.key});
        } else {
            return await sock.sendMessage(groupId, {text: "_✅ The person's admin privileges have been successfully removed!"}, { quoted: rawMessage.messages[0] });
        }
    }
}));

addCommand({pattern: "^mute ?(.*)", desc:"Allows you to mute the user in the group.", usage: "mute 1 <s || m || h>", access: "all", onlyInGroups: true}, (async (msg, match, sock) => {
    const groupId = msg.key.remoteJid;

    var admins = await getAdmins(msg, sock, groupId);
    if (!admins.includes(msg.key.participant)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
    }

    if (!await checkAdmin(msg, sock, groupId)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
    };

    

    const timeMatch = match[1].match(/^(\d+)([smhdwy])$/);
    if (timeMatch) {
        const time = parseInt(timeMatch[1]);
        const unit = timeMatch[2];
        const unitDurations = { s: 1000, m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000, w: 7 * 24 * 60 * 60 * 1000, y: 365 * 24 * 60 * 60 * 1000 };
        const duration = time * unitDurations[unit];
        const unitTexts = { s: "second(s)", m: "minute(s)", h: "hour(s)", d: "day(s)", w: "week(s)", y: "year(s)" };
        
        await sock.sendMessage(groupId, {text: `_✅ The group has been muted for ${time} ${unitTexts[unit]}!_`, edit: msg.key});
        await sock.groupSettingUpdate(groupId, 'announcement');

        setTimeout(async () => {
            await sock.groupSettingUpdate(groupId, 'not_announcement');
            await sock.sendMessage(groupId, {text: `_✅ The group has been unmuted!_`});
        }, duration);

        return;
    } else {
        const muteMessage = {text: `_✅ The group has been muted!_`, edit: msg.key};
        if (match[1] === "") {
            await sock.sendMessage(groupId, muteMessage);
            return await sock.groupSettingUpdate(groupId, 'announcement');
        } else {
            const errorMessage = {text: "_❌ Invalid time format. Please use the format: `mute <time> <unit>`_", edit: msg.key};
            return await sock.sendMessage(groupId, errorMessage);
        }
    }
}))

addCommand({pattern: "^unmute ?(.*)", desc:"Allows you to unmute the group.", usage: "unmute", access: "all", onlyInGroups: true}, (async (msg, match, sock) => {
    const groupId = msg.key.remoteJid;

    var admins = await getAdmins(msg, sock, groupId);
    if (!admins.includes(msg.key.participant)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, You are not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
    }

    if (!await checkAdmin(msg, sock, groupId)) {
        if (msg.key.fromMe) {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_", edit: msg.key})
        } else {
            return await sock.sendMessage(groupId, {text: "_❌ Sorry, I am not an admin in this group!_"}, { quoted: rawMessage.messages[0] })
        }
    };
    
    await sock.groupSettingUpdate(groupId, 'not_announcement');
    if (msg.key.fromMe) {
        return await sock.sendMessage(groupId, {text: "_✅ The group has been unmuted!_", edit: msg.key});
    } else {
        return await sock.sendMessage(groupId, {text: "_✅ The group has been unmuted!_"}, { quoted: rawMessage.messages[0] });
    }
}));