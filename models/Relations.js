module.exports = async function (db) {
	await db.countries.hasMany(db.users, {
		foreignKey: {
			name: "country_id",
			allowNull: false,
		},
	});

	await db.users.belongsTo(db.countries, {
		foreignKey: {
			name: "country_id",
			allowNull: false,
		},
	});

	await db.users.hasMany(db.sessions, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.sessions.belongsTo(db.users, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.users.hasMany(db.attempts, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.attempts.belongsTo(db.users, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.users.hasMany(db.user_bans, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.user_bans.belongsTo(db.users, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.users.hasMany(db.projects, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.projects.belongsTo(db.users, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.skills.hasMany(db.projects_skills, {
		foreignKey: {
			name: "skill_id",
			allowNull: false,
		},
	});

	