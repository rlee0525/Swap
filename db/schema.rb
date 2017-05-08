# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170508171053) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "courses", force: :cascade do |t|
    t.integer  "university_id", null: false
    t.string   "course_name",   null: false
    t.string   "course_number", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["university_id"], name: "index_courses_on_university_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.text     "description", null: false
    t.integer  "price",       null: false
    t.string   "img_url1",    null: false
    t.string   "img_url2",    null: false
    t.integer  "category_id", null: false
    t.integer  "course_id",   null: false
    t.string   "zip_code"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "title",       null: false
    t.index ["course_id"], name: "index_posts_on_course_id", using: :btree
    t.index ["user_id"], name: "index_posts_on_user_id", using: :btree
  end

  create_table "universities", force: :cascade do |t|
    t.string   "name",            null: false
    t.string   "email_extension", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "users", force: :cascade do |t|
    t.integer  "fb_id",                                   null: false
    t.string   "edu_email"
    t.integer  "university_id",                           null: false
    t.boolean  "marketing_opt_in",        default: true,  null: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "fb_email"
    t.boolean  "edu_email_confirmed",     default: false
    t.string   "edu_email_confirm_token"
    t.index ["edu_email"], name: "index_users_on_edu_email", using: :btree
    t.index ["fb_id"], name: "index_users_on_fb_id", unique: true, using: :btree
    t.index ["university_id"], name: "index_users_on_university_id", using: :btree
  end

end
