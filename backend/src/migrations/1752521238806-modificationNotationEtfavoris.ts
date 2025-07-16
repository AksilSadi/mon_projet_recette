import { MigrationInterface, QueryRunner } from "typeorm";

export class ModificationNotationEtfavoris1752521238806 implements MigrationInterface {
    name = 'ModificationNotationEtfavoris1752521238806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notation" DROP CONSTRAINT "FK_2094c3da647cf0e54a9b8a7cc39"`);
        await queryRunner.query(`ALTER TABLE "notation" DROP CONSTRAINT "FK_5dac9fe91da5f249d722e2db8c0"`);
        await queryRunner.query(`ALTER TABLE "notation" DROP CONSTRAINT "UQ_b7dbdc2f23fe2293276e91d1a70"`);
        await queryRunner.query(`ALTER TABLE "notation" ALTER COLUMN "recetteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notation" ALTER COLUMN "utilisateurId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notation" ADD CONSTRAINT "UQ_b7dbdc2f23fe2293276e91d1a70" UNIQUE ("recetteId", "utilisateurId")`);
        await queryRunner.query(`ALTER TABLE "notation" ADD CONSTRAINT "FK_2094c3da647cf0e54a9b8a7cc39" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notation" ADD CONSTRAINT "FK_5dac9fe91da5f249d722e2db8c0" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notation" DROP CONSTRAINT "FK_5dac9fe91da5f249d722e2db8c0"`);
        await queryRunner.query(`ALTER TABLE "notation" DROP CONSTRAINT "FK_2094c3da647cf0e54a9b8a7cc39"`);
        await queryRunner.query(`ALTER TABLE "notation" DROP CONSTRAINT "UQ_b7dbdc2f23fe2293276e91d1a70"`);
        await queryRunner.query(`ALTER TABLE "notation" ALTER COLUMN "utilisateurId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notation" ALTER COLUMN "recetteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notation" ADD CONSTRAINT "UQ_b7dbdc2f23fe2293276e91d1a70" UNIQUE ("recetteId", "utilisateurId")`);
        await queryRunner.query(`ALTER TABLE "notation" ADD CONSTRAINT "FK_5dac9fe91da5f249d722e2db8c0" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notation" ADD CONSTRAINT "FK_2094c3da647cf0e54a9b8a7cc39" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
