sql = `
    DROP TABLE IF EXISTS data;
    CREATE TABLE data (id SERIAL PRIMARY KEY, name VARCHAR(50), titles INTEGER);
    INSERT INTO data (name, titles) VALUES ('Rafael Nadal', '21');
    INSERT INTO data (name, titles) VALUES ('Roger Federer', '20');
    INSERT INTO data (name, titles) VALUES ('Novak Djokovic', '20');
    INSERT INTO data (name, titles) VALUES ('Pete Sampras', '14');
    INSERT INTO data (name, titles) VALUES ('Roy Emerson', '12');
    INSERT INTO data (name, titles) VALUES ('Rod Laver', '11');
    INSERT INTO data (name, titles) VALUES ('Bjorn Borg', '11');
`
module.exports = sql