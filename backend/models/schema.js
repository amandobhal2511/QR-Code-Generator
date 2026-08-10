import { pgTable, serial, text, varchar, bytea, timestamp} from 'drizzle-orm/pg-core';

export const table = pgTable('QRdb' , {
    
    id: serial("id").primaryKey(),

    content: text("content").notNull(),

    contentHash: varchar("content_hash", {length: 64}).notNull().unique(),

    qrImage: text("qr_image").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull()
});




// id.   Content    Hash    QR Image      Created AT