import "https://deno.land/x/dotenv@v3.2.0/load.ts"

import {
	Database, DataTypes, Model, PostgresConnector
} from "https://deno.land/x/denodb@v1.0.40/mod.ts"

const connection = new PostgresConnector({
	uri: Deno.env.get("DATABASE_URL")!
})

export const db = new Database(connection)

export class Config extends Model {
	static table = "configs"
	static timestamps = true

	static fields = {
		filename: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		shorthand: DataTypes.STRING,
		content: DataTypes.TEXT
	}
}

export class Secret extends Model {
	static table = "secrets"
	static timestamps = true

	static fields = {
		project: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		path: DataTypes.STRING,
		content: DataTypes.TEXT
	}
}

db.link([Config, Secret])

// db.sync({ drop: true })
