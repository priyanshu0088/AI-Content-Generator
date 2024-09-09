import { serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const AIOutput=pgTable('aiOutput',{
    id:serial('id').primaryKey(),
    formData:varchar('formData').notNull(),
    aiResponse:text('airesponse'),
    templateSlug:varchar('templateslug').notNull(),
    email:varchar('email'),
    createdAt:varchar('createdAt')

})