CREATE TABLE "store_products"(
    "id" UUID NOT NULL,
    "YM_id" BIGINT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category_id" BIGINT NULL,
    "price" BIGINT NOT NULL,
    "rec_price" BIGINT NULL,
    "min_price" BIGINT NULL,
    "rule_id" BIGINT NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "store_products" ADD PRIMARY KEY("id");
ALTER TABLE
    "store_products" ADD CONSTRAINT "store_products_ym_id_unique" UNIQUE("YM_id");
CREATE TABLE "competitor_products"(
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "our_product_id" UUID NULL,
    "competitor_id" UUID NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "competitor_products" ADD PRIMARY KEY("id");
CREATE TABLE "category"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL
);
ALTER TABLE
    "category" ADD PRIMARY KEY("id");
CREATE TABLE "price_rules"(
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "rule" TEXT NOT NULL
);
ALTER TABLE
    "price_rules" ADD PRIMARY KEY("id");
CREATE TABLE "price_history"(
    "product_id" UUID NOT NULL,
    "time_stamp" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "price" BIGINT NOT NULL
);
ALTER TABLE
    "price_history" ADD PRIMARY KEY("product_id");
CREATE TABLE "competitor"(
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL
);
ALTER TABLE
    "competitor" ADD PRIMARY KEY("id");
ALTER TABLE
    "competitor_products" ADD CONSTRAINT "competitor_products_competitior_id_foreign" FOREIGN KEY("competitior_id") REFERENCES "competitor"("id");
ALTER TABLE
    "store_products" ADD CONSTRAINT "store_products_rule_foreign" FOREIGN KEY("rule") REFERENCES "price_rules"("id");
ALTER TABLE
    "price_history" ADD CONSTRAINT "price_history_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "competitor_products"("id");
ALTER TABLE
    "competitor_products" ADD CONSTRAINT "competitor_products_our_porduct_id_foreign" FOREIGN KEY("our_porduct_id") REFERENCES "store_products"("id");
ALTER TABLE
    "price_history" ADD CONSTRAINT "price_history_product_id_foreign_2" FOREIGN KEY("product_id") REFERENCES "store_products"("id");
ALTER TABLE
    "store_products" ADD CONSTRAINT "store_products_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "category"("id");



--Для автоматического обновления поля updatedAt в таблице competitors_product 
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    
    IF OLD.price IS DISTINCT FROM NEW.price THEN
        NEW.updatedAt = now(); 
    END IF;
    RETURN NEW; 
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_updated_at_trigger
BEFORE UPDATE ON competitor_products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TABLE our_price_history (
    id SERIAL PRIMARY KEY,
    our_product_id UUID NOT NULL,
    time_stamp TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    price BIGINT NOT NULL,
    FOREIGN KEY (our_product_id) REFERENCES store_products(id)
);



CREATE TABLE competitor_price_history (
    id SERIAL PRIMARY KEY,
    competitor_product_id UUID NOT NULL,
    time_stamp TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    price BIGINT NOT NULL,
    FOREIGN KEY (competitor_product_id) REFERENCES competitor_products(id)
);