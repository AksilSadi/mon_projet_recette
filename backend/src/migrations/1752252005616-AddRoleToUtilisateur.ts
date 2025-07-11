import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUtilisateur1752252005616 implements MigrationInterface {
    name = 'AddRoleToUtilisateur1752252005616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."utilisateur_role_enum" RENAME TO "utilisateur_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."utilisateur_role_enum" AS ENUM('cuisinier', 'visiteur')`);
        await queryRunner.query(`ALTER TABLE "utilisateur" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "utilisateur" ALTER COLUMN "role" TYPE "public"."utilisateur_role_enum" USING "role"::"text"::"public"."utilisateur_role_enum"`);
        await queryRunner.query(`ALTER TABLE "utilisateur" ALTER COLUMN "role" SET DEFAULT 'visiteur'`);
        await queryRunner.query(`DROP TYPE "public"."utilisateur_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."utilisateur_role_enum_old" AS ENUM('CUISINIER', 'VISITEUR')`);
        await queryRunner.query(`ALTER TABLE "utilisateur" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "utilisateur" ALTER COLUMN "role" TYPE "public"."utilisateur_role_enum_old" USING "role"::"text"::"public"."utilisateur_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "utilisateur" ALTER COLUMN "role" SET DEFAULT 'VISITEUR'`);
        await queryRunner.query(`DROP TYPE "public"."utilisateur_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."utilisateur_role_enum_old" RENAME TO "utilisateur_role_enum"`);
    }

}
