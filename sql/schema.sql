-- We begin a transaction so that if any SQL statement fails, none of the
-- changes will be applied.
begin;

-- Create the schema we are going to use.
create schema community_fund;

-- Create a schema to host the utilities for our schema. The reason it is in
-- another schema is so that it can be private.
create schema community_fund_utils;

-- By setting the `search_path`, whenever we create something in the default
-- namespace it is actually created in the `community_fund` schema.
--
-- For example, this lets us write `create table reviewer …` instead of
-- `create table community_fund.reviewer …`.
set search_path = community_fund, community_fund_utils, public;

-------------------------------------------------------------------------------
-- Public Tables

create table reviewer (
  id               serial not null primary key,
  name             varchar(64) not null,
  created_at       timestamp,
  updated_at       timestamp
);

comment on table reviewer is 'A reviewer of the submissions.';
comment on column reviewer.id is 'The primary key for the reviewer.';
comment on column reviewer.name is 'The reviewers first name.';
comment on column reviewer.created_at is 'The time this reviewer was created.';
comment on column reviewer.updated_at is 'The latest time this reviewer was updated.';

create type submission_status as enum ('pending', 'passed', 'rejected');

-- TODO: email, phone, askamount, totalamound,
create table submission (
  id               serial not null primary key,
  status           submission_status,
  created_at       timestamp,
  updated_at       timestamp
);

comment on table submission is 'A funding submission written by a submitter.';
comment on column submission.id is 'The primary key for the submission.';
comment on column submission.status is 'The status this has been submissioned in.';
comment on column submission.created_at is 'The time this submission was created.';
comment on column submission.updated_at is 'The latest time this submission was updated.';

-- TODO: Add will_be_held_on date column.
create table event (
  id               serial not null primary key,
  submission_id    int not null references submission(id),
  title            text not null,
  description      text,
  created_at       timestamp,
  updated_at       timestamp
);

comment on table event is 'An event created in a submission.';
comment on column event.id is 'The primary key for the submission.';
comment on column event.title is 'The name given to identify the event.';
comment on column event.description is 'A textblock describing the event.';
comment on column event.created_at is 'The last time the event was created.';
comment on column event.updated_at is 'The last time the event was updated.';

-------------------------------------------------------------------------------
-- Triggers

-- First we must define two utility functions, `set_created_at` and
-- set_updated_at` which we will use for our triggers.
--
-- Note that we also create them in `community_fund_utils` as we want them to be
-- private and not exposed.
--
-- Triggers taken initially from the Rust [Diesel][1] library, documentation
-- for `is distinct from` can be found [here][2].
--
-- [1]: https://github.com/diesel-rs/diesel/blob/1427b9f/diesel/src/pg/connection/setup/timestamp_helpers.sql
-- [2]: https://wiki.submissiongresql.org/wiki/Is_distinct_from

create function community_fund_utils.set_created_at() returns trigger as $$
begin
  -- We will let the inserter manually set a `created_at` time if they desire.
  if (new.created_at is null) then
    new.created_at := current_timestamp;
  end if;
  return new;
end;
$$ language plpgsql;

create function community_fund_utils.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

-- Next we must actually define our triggers for all tables that need them.

create trigger created_at before insert on reviewer for each row execute procedure set_created_at();
create trigger updated_at before update on reviewer for each row execute procedure set_updated_at();
create trigger created_at before insert on submission for each row execute procedure set_created_at();
create trigger updated_at before update on submission for each row execute procedure set_updated_at();
create trigger created_at before insert on event for each row execute procedure set_created_at();
create trigger updated_at before update on event for each row execute procedure set_updated_at();

-------------------------------------------------------------------------------
-- Permissions

grant select on reviewer, submission, event to public;

-- Commit all the changes from this transaction. If any statement failed,
-- these statements will not have succeeded.
commit;
