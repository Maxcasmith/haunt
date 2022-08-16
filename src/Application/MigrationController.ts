import { command } from "../Command";
import migrations from "../migrations";
import { Query } from "../Entities/Query";

export default class MigrationController 
{
    @command('migrate')
    async migrate() {
        const query:Query = new Query();

        const migrationsTable:any = await new Promise((resolve) => query.rawQueryString(`SELECT * FROM migrations;`).submitQuery()
            .then((res) => resolve(res))
            .catch(err => resolve(err.errno))
        );

        let counter:number = 0;
        let group:number = 0;

        const migrateTable = async (migration:any) => {
            counter++;
            await query.rawQueryString(migration.up).submitQuery();
            await query.rawQueryString(
                `INSERT INTO migrations (name, group_id) VALUES ('${migration.name}', ${group});`
            ).submitQuery();
        };
        
        console.log("Migrating Data");

        if (migrationsTable == 1146) {
            migrations.forEach(async migration => migrateTable(migration()));
        } else {
            group = migrationsTable[migrationsTable.length - 1].group_id + 1;
            migrations.forEach(async migration => {
                const hasMigrated:boolean = migrationsTable.find((m:any) => m.name == migration().name) != null
                if (hasMigrated == false) migrateTable(migration());
            });
        }

        console.log(`Finished Migrating ${counter} tables`);
    }

    @command('migrate:rollback')
    async rollback() {
        const query:Query = new Query();
        const migrationsTable:any = await new Promise((resolve) => query.rawQueryString(`SELECT * FROM migrations;`).submitQuery()
            .then((res) => resolve(res))
            .catch(err => resolve(err.errno))
        );

        let counter:number = 0;

        if (migrationsTable == 1146) {
            console.log("No Tables to rollback");
            return;
        }

        const rollbackMigration = async (migration:any) => {
            counter++;
            await query.rawQueryString(
                `DELETE FROM migrations WHERE name='${migration.name}';`
            ).submitQuery();
            await query.rawQueryString(migration.down).submitQuery();
        }

        console.log("Rolling back tables");

        migrationsTable.reverse();
    
        const group:number = migrationsTable[0].group_id;
        const migrationsToRollback:any = migrationsTable.filter((m:any) => m.group_id == group);

        migrationsToRollback.forEach(async (m:any) => {
            const migration:any = migrations.find(x => x().name == m.name);
            await rollbackMigration(migration());
        });
        
        console.log(`Rolled back ${counter} tables`);
    }
}
