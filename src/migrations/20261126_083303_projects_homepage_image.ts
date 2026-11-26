import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_homepage_image" AS ENUM('no', 'yes');
  CREATE TYPE "public"."enum__projects_v_version_homepage_image" AS ENUM('no', 'yes');
  ALTER TABLE "projects" ADD COLUMN "homepage_image" "enum_projects_homepage_image" DEFAULT 'no';
  ALTER TABLE "_projects_v" ADD COLUMN "version_homepage_image" "enum__projects_v_version_homepage_image" DEFAULT 'no';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" DROP COLUMN "homepage_image";
  ALTER TABLE "_projects_v" DROP COLUMN "version_homepage_image";
  DROP TYPE "public"."enum_projects_homepage_image";
  DROP TYPE "public"."enum__projects_v_version_homepage_image";`)
}
