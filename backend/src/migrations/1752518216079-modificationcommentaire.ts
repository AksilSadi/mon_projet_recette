import { MigrationInterface, QueryRunner } from "typeorm";

export class Modificationcommentaire1752518216079 implements MigrationInterface {
    name = 'Modificationcommentaire1752518216079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commentaire" DROP CONSTRAINT "FK_7417d060012a21849b40dd429c0"`);
        await queryRunner.query(`ALTER TABLE "commentaire" DROP CONSTRAINT "FK_45154ca5033a18c0626b891cb41"`);
        await queryRunner.query(`ALTER TABLE "commentaire" ALTER COLUMN "recetteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "commentaire" ALTER COLUMN "utilisateurId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "commentaire" ADD CONSTRAINT "FK_7417d060012a21849b40dd429c0" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentaire" ADD CONSTRAINT "FK_45154ca5033a18c0626b891cb41" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commentaire" DROP CONSTRAINT "FK_45154ca5033a18c0626b891cb41"`);
        await queryRunner.query(`ALTER TABLE "commentaire" DROP CONSTRAINT "FK_7417d060012a21849b40dd429c0"`);
        await queryRunner.query(`ALTER TABLE "commentaire" ALTER COLUMN "utilisateurId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "commentaire" ALTER COLUMN "recetteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "commentaire" ADD CONSTRAINT "FK_45154ca5033a18c0626b891cb41" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentaire" ADD CONSTRAINT "FK_7417d060012a21849b40dd429c0" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
