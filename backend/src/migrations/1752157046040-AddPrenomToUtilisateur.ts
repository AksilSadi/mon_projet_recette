import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrenomToUtilisateur1752157046040 implements MigrationInterface {
    name = 'AddPrenomToUtilisateur1752157046040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "utilisateur" ADD "prenom" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "utilisateur" DROP COLUMN "prenom"`);
    }

}
