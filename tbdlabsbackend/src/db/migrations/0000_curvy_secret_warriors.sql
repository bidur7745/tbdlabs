CREATE TYPE "public"."user_role" AS ENUM('superadmin', 'staff');--> statement-breakpoint
CREATE TYPE "public"."inquiry_status" AS ENUM('new', 'in_progress', 'replied', 'archived');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'staff' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "system_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"contact_email_notifications_enabled" boolean DEFAULT true NOT NULL,
	"updated_by" uuid,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "system_settings_singleton_id" CHECK ("system_settings"."id" = 1)
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(35),
	"organization" varchar(150),
	"service" varchar(100) NOT NULL,
	"budget" varchar(50),
	"message" text NOT NULL,
	"status" "inquiry_status" DEFAULT 'new' NOT NULL,
	"claimed_by_user_id" uuid,
	"claimed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inquiry_replies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inquiry_id" uuid NOT NULL,
	"sender_user_id" uuid NOT NULL,
	"recipient_email" varchar(255) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"message_body" text NOT NULL,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "system_settings" ADD CONSTRAINT "system_settings_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_claimed_by_user_id_users_id_fk" FOREIGN KEY ("claimed_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inquiry_replies" ADD CONSTRAINT "inquiry_replies_inquiry_id_inquiries_id_fk" FOREIGN KEY ("inquiry_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inquiry_replies" ADD CONSTRAINT "inquiry_replies_sender_user_id_users_id_fk" FOREIGN KEY ("sender_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "inquiries_status_created_at_idx" ON "inquiries" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "inquiries_service_idx" ON "inquiries" USING btree ("service");