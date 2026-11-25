import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "productions_format" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_productions_format",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_productions_v_version_format" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__productions_v_version_format",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "productions_format" ADD CONSTRAINT "productions_format_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."productions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_productions_v_version_format" ADD CONSTRAINT "_productions_v_version_format_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_productions_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "productions_format_order_idx" ON "productions_format" USING btree ("order");
  CREATE INDEX "productions_format_parent_idx" ON "productions_format" USING btree ("parent_id");
  CREATE INDEX "_productions_v_version_format_order_idx" ON "_productions_v_version_format" USING btree ("order");
  CREATE INDEX "_productions_v_version_format_parent_idx" ON "_productions_v_version_format" USING btree ("parent_id");
  
  INSERT INTO "productions_format" ("order", "parent_id", "value")
  SELECT 1, "id", "format" FROM "productions" WHERE "format" IS NOT NULL;
  INSERT INTO "_productions_v_version_format" ("order", "parent_id", "value")
  SELECT 1, "id", "version_format" FROM "_productions_v" WHERE "version_format" IS NOT NULL;
  
  ALTER TABLE "productions" DROP COLUMN "format";
  ALTER TABLE "_productions_v" DROP COLUMN "version_format";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "productions" ADD COLUMN "format" "enum_productions_format";
  ALTER TABLE "_productions_v" ADD COLUMN "version_format" "enum__productions_v_version_format";
  
  UPDATE "productions" p SET "format" = s."value"
    FROM "productions_format" s WHERE s."parent_id" = p."id" AND s."order" = 1;
  UPDATE "_productions_v" v SET "version_format" = s."value"
    FROM "_productions_v_version_format" s WHERE s."parent_id" = v."id" AND s."order" = 1;
  
  DROP TABLE "productions_format" CASCADE;
  DROP TABLE "_productions_v_version_format" CASCADE;`)
}
