import { MigrationInterface, QueryRunner } from "typeorm";

export class ModificationRecette1752597182572 implements MigrationInterface {
    name = 'ModificationRecette1752597182572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recette" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recette" DROP COLUMN "type"`);
    }

}
