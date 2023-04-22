module.exports = async (client) => {
	client.user.setPresence({
		status: "dnd"
	});
};