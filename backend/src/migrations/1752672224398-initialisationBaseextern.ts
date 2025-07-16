import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialisationBaseextern1752672224398 implements MigrationInterface {
    name = 'InitialisationBaseextern1752672224398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "categorie" character varying NOT NULL, CONSTRAINT "UQ_8b28170179a02df33291395de7c" UNIQUE ("nom"), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recette_ingredient" ("id" SERIAL NOT NULL, "recetteId" integer NOT NULL, "ingredientId" integer NOT NULL, "quantite" double precision NOT NULL, "unite" character varying NOT NULL, CONSTRAINT "PK_2e2af31e19e8861aeb622ce9457" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commentaire" ("id" SERIAL NOT NULL, "texte" text NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "recetteId" integer NOT NULL, "utilisateurId" integer NOT NULL, CONSTRAINT "PK_a4fa195414f3428179d40988716" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notation" ("id" SERIAL NOT NULL, "note" integer NOT NULL, "recetteId" integer NOT NULL, "utilisateurId" integer NOT NULL, CONSTRAINT "UQ_b7dbdc2f23fe2293276e91d1a70" UNIQUE ("recetteId", "utilisateurId"), CONSTRAINT "PK_143c801436800e80854f195b5f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favoris" ("utilisateurId" integer NOT NULL, "recetteId" integer NOT NULL, CONSTRAINT "PK_7478eca02550a2a636acc7a4377" PRIMARY KEY ("utilisateurId", "recetteId"))`);
        await queryRunner.query(`CREATE TABLE "recette" ("id" SERIAL NOT NULL, "titre" character varying NOT NULL, "description" text NOT NULL, "etapes" text NOT NULL, "temps" integer NOT NULL, "type" character varying NOT NULL, "image" character varying, "utilisateurId" integer NOT NULL, CONSTRAINT "PK_2e3debb3047f8e82ab71e4eb2f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."utilisateur_role_enum" AS ENUM('cuisinier', 'visiteur')`);
        await queryRunner.query(`CREATE TABLE "utilisateur" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "prenom" character varying NOT NULL, "role" "public"."utilisateur_role_enum" NOT NULL DEFAULT 'visiteur', "email" character varying NOT NULL, "motDePasse" character varying NOT NULL, CONSTRAINT "UQ_e1136325a6b28e2a02b81b2f5e1" UNIQUE ("email"), CONSTRAINT "PK_838f0f99fe900e49ef050030443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ADD CONSTRAINT "FK_0feff37d1f0df7be2f77433c0a3" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" ADD CONSTRAINT "FK_28dde6572ad3b289e0757cef4e7" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentaire" ADD CONSTRAINT "FK_7417d060012a21849b40dd429c0" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentaire" ADD CONSTRAINT "FK_45154ca5033a18c0626b891cb41" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notation" ADD CONSTRAINT "FK_2094c3da647cf0e54a9b8a7cc39" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notation" ADD CONSTRAINT "FK_5dac9fe91da5f249d722e2db8c0" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoris" ADD CONSTRAINT "FK_05d52ea0411b13bb34da8bbf8f4" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoris" ADD CONSTRAINT "FK_4b80f1136d932a808fca613b387" FOREIGN KEY ("recetteId") REFERENCES "recette"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recette" ADD CONSTRAINT "FK_554113f5dda211f15613ff7830e" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recette" DROP CONSTRAINT "FK_554113f5dda211f15613ff7830e"`);
        await queryRunner.query(`ALTER TABLE "favoris" DROP CONSTRAINT "FK_4b80f1136d932a808fca613b387"`);
        await queryRunner.query(`ALTER TABLE "favoris" DROP CONSTRAINT "FK_05d52ea0411b13bb34da8bbf8f4"`);
        await queryRunner.query(`ALTER TABLE "notation" DROP CONSTRAINT "FK_5dac9fe91da5f249d722e2db8c0"`);
        await queryRunner.query(`ALTER TABLE "notation" DROP CONSTRAINT "FK_2094c3da647cf0e54a9b8a7cc39"`);
        await queryRunner.query(`ALTER TABLE "commentaire" DROP CONSTRAINT "FK_45154ca5033a18c0626b891cb41"`);
        await queryRunner.query(`ALTER TABLE "commentaire" DROP CONSTRAINT "FK_7417d060012a21849b40dd429c0"`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" DROP CONSTRAINT "FK_28dde6572ad3b289e0757cef4e7"`);
        await queryRunner.query(`ALTER TABLE "recette_ingredient" DROP CONSTRAINT "FK_0feff37d1f0df7be2f77433c0a3"`);
        await queryRunner.query(`DROP TABLE "utilisateur"`);
        await queryRunner.query(`DROP TYPE "public"."utilisateur_role_enum"`);
        await queryRunner.query(`DROP TABLE "recette"`);
        await queryRunner.query(`DROP TABLE "favoris"`);
        await queryRunner.query(`DROP TABLE "notation"`);
        await queryRunner.query(`DROP TABLE "commentaire"`);
        await queryRunner.query(`DROP TABLE "recette_ingredient"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}
