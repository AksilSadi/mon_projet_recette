import { MigrationInterface, QueryRunner } from "typeorm";

export class ModificationRecetteIngredient1752511477472 implements MigrationInterface {
    name = 'ModificationRecetteIngredient1752511477472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recette_ingredient" DROP CONSTRAINT "FK_0feff37d1f0df7be2f77433c0a3"`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" DROP CONSTRAINT "FK_28dde6572ad3b289e0757cef4e7"`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ALTER COLUMN "recetteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ALTER COLUMN "ingredientId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ADD CONSTRAINT "FK_0feff37d1f0df7be2f77433c0a3" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ADD CONSTRAINT "FK_28dde6572ad3b289e0757cef4e7" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recette_ingredient" DROP CONSTRAINT "FK_28dde6572ad3b289e0757cef4e7"`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" DROP CONSTRAINT "FK_0feff37d1f0df7be2f77433c0a3"`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ALTER COLUMN "ingredientId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ALTER COLUMN "recetteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ADD CONSTRAINT "FK_28dde6572ad3b289e0757cef4e7" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ADD CONSTRAINT "FK_0feff37d1f0df7be2f77433c0a3" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
