set search_path = community_fund, community_fund_utils, public;

-------------------------------------------------------------------------------
-- Sample Data

insert into reviewer (id, name) values
  (1, 'Kathryn'),
  (2, 'Johnny'),
  (3, 'Nancy'),
  (4, 'Russell'),
  (5, 'Ann');

alter sequence reviewer_id_seq restart with 6;

insert into submission (id, email, phone, ask_amount, total_amount) values
  (1, 'foo@bar.is', '5812345', 50000, 50000),
  (2, 'fry@futur.ama', '81238765', 20000, 100000),
  (3, 'leela@futur.ama', '8885552', 30000, 40000),
  (4, 'bender@futu.rama', '6601234', 35000, 60000),
  (5, 'amy@futur.rama', null, 40000, 40000);

alter sequence submission_id_seq restart with 6;

insert into event (id, submission_id, title, description) values
  (1, 1, 'No… It’s a thing; it’s like a plan, but with more greatness.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper, sem sed pulvinar rutrum, nisl dui faucibus velit, eget sodales urna mauris nec lorem. Vivamus faucibus augue sit amet semper fringilla. Cras nec vulputate eros. Proin fermentum purus posuere ipsum accumsan interdum. Nunc vitae urna non mauris pellentesque sodales vel nec elit. Suspendisse pulvinar ornare turpis ac vestibulum. Cras eu congue magna. Nulla vel sodales enim, vel semper dolor. Curabitur pellentesque dolor elit. Aenean cursus posuere dui, vitae mollis felis rhoncus ac. In at orci a erat congue consequat ut sed risus. Etiam euismod elit eu lobortis varius. Praesent lacinia lobortis nisi, vel faucibus turpis sodales in. In interdum lectus tellus, facilisis mollis diam feugiat vitae.'),
  (2, 2, 'I hate yogurt. It’s just stuff with bits in.', 'inspiration'),
  (3, 3, 'Is that a cooking show?', 'inspiration'),
  (4, 4, 'You hit me with a cricket bat.', null),
  (5, 5, 'Please, Don-Bot… look into your hard drive, and open your mercy file!', 'Good news everyone!');


alter sequence event_id_seq restart with 6;
