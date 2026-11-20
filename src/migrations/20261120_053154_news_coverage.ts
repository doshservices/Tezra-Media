import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "news_category" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_news_category",
  	"id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE "_news_v_version_category" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__news_v_version_category",
  	"id" serial PRIMARY KEY NOT NULL
  );

  ALTER TABLE "news_category" ADD CONSTRAINT "news_category_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_category" ADD CONSTRAINT "_news_v_version_category_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "news_category_order_idx" ON "news_category" USING btree ("order");
  CREATE INDEX "news_category_parent_idx" ON "news_category" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_category_order_idx" ON "_news_v_version_category" USING btree ("order");
  CREATE INDEX "_news_v_version_category_parent_idx" ON "_news_v_version_category" USING btree ("parent_id");

  INSERT INTO "news_category" ("order", "parent_id", "value")
  SELECT 1, "id", "category" FROM "news" WHERE "category" IS NOT NULL;
  INSERT INTO "_news_v_version_category" ("order", "parent_id", "value")
  SELECT 1, "id", "version_category" FROM "_news_v" WHERE "version_category" IS NOT NULL;

  ALTER TABLE "news" DROP COLUMN "category";
  ALTER TABLE "_news_v" DROP COLUMN "version_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news" ADD COLUMN "category" "enum_news_category";
  ALTER TABLE "_news_v" ADD COLUMN "version_category" "enum__news_v_version_category";

  UPDATE "news" SET "category" = s."value"
  FROM "news_category" s WHERE s."parent_id" = "news"."id" AND s."order" = 1;
  UPDATE "_news_v" SET "version_category" = s."value"
  FROM "_news_v_version_category" s WHERE s."parent_id" = "_news_v"."id" AND s."order" = 1;

  DROP TABLE "news_category" CASCADE;
  DROP TABLE "_news_v_version_category" CASCADE;`)
}
