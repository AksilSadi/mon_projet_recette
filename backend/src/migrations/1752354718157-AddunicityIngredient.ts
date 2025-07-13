import { MigrationInterface, QueryRunner } from "typeorm";

export class AddunicityIngredient1752354718157 implements MigrationInterface {
    name = 'AddunicityIngredient1752354718157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "UQ_8b28170179a02df33291395de7c" UNIQUE ("nom")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "UQ_8b28170179a02df33291395de7c"`);
    }

}
