import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUtilisateur1752251310251 implements MigrationInterface {
    name = 'AddRoleToUtilisateur1752251310251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."utilisateur_role_enum" AS ENUM('CUISINIER', 'VISITEUR')`);
        await queryRunner.query(`ALTER TABLE "utilisateur" ADD "role" "public"."utilisateur_role_enum" NOT NULL DEFAULT 'VISITEUR'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "utilisateur" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."utilisateur_role_enum"`);
    }

}
