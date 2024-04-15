CREATE TABLE "store_products"(
    "id" BIGINT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "rule" BIGINT NOT NULL
);
ALTER TABLE
    "store_products" ADD PRIMARY KEY("id");
CREATE TABLE "competitor_products"(
    "id" BIGINT NOT NULL,
    "url" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "title" TEXT NOT NULL
);
ALTER TABLE
    "competitor_products" ADD PRIMARY KEY("id");
CREATE TABLE "competitor_our_product"(
    "our_product" BIGINT NOT NULL,
    "competitor_product" BIGINT NOT NULL
);
CREATE TABLE "price_rules"(
    "id" BIGINT NOT NULL,
    "rule" TEXT NOT NULL
);
ALTER TABLE
    "price_rules" ADD PRIMARY KEY("id");
CREATE TABLE "price_history"(
    "id" BIGINT NOT NULL,
    "time_stamp" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "product_id" BIGINT NOT NULL,
    "price" BIGINT NOT NULL
);
ALTER TABLE
    "price_history" ADD PRIMARY KEY("id");
ALTER TABLE
    "competitor_our_product" ADD CONSTRAINT "competitor_our_product_competitor_product_foreign" FOREIGN KEY("competitor_product") REFERENCES "competitor_products"("id");
ALTER TABLE
    "store_products" ADD CONSTRAINT "store_products_rule_foreign" FOREIGN KEY("rule") REFERENCES "price_rules"("id");
ALTER TABLE
    "price_history" ADD CONSTRAINT "price_history_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "competitor_products"("id");
ALTER TABLE
    "price_history" ADD CONSTRAINT "price_history_product_id_foreign_2" FOREIGN KEY("product_id") REFERENCES "store_products"("id");
ALTER TABLE
    "competitor_our_product" ADD CONSTRAINT "competitor_our_product_our_product_foreign" FOREIGN KEY("our_product") REFERENCES "store_products"("id");