import { MigrationInterface, QueryRunner } from "typeorm";

export class ModificationRecette1752439785568 implements MigrationInterface {
    name = 'ModificationRecette1752439785568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recette" DROP CONSTRAINT "FK_554113f5dda211f15613ff7830e"`);
        await queryRunner.query(`ALTER TABLE "recette" ALTER COLUMN "utilisateurId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recette" ADD CONSTRAINT "FK_554113f5dda211f15613ff7830e" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recette" DROP CONSTRAINT "FK_554113f5dda211f15613ff7830e"`);
        await queryRunner.query(`ALTER TABLE "recette" ALTER COLUMN "utilisateurId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recette" ADD CONSTRAINT "FK_554113f5dda211f15613ff7830e" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
