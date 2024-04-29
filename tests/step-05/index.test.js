const readCSV = require('../../src/csvReader');
const { parseSelectQuery } = require('../../src/queryParser');
const executeSELECTQuery = require('../../src/index');


test('Read CSV File', async () => {
    const data = await readCSV('./student.csv');
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(5);
    expect(data[0].name).toBe('John');
    expect(data[0].age).toBe('30'); //ignore the string type here, we will fix this later
});

test('Parse SQL Query', () => {
    const query = 'SELECT id, name FROM student';
    const parsed = parseSelectQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'student',
        groupByFields: null,
        hasAggregateWithoutGroupBy: false,
        isDistinct: false,
        whereClauses: [],
        joinTable: null, // Add this line to match the received output
        joinCondition: null, // Add this line to match the received output
        joinType: null, // Add this line to match the received output
        orderByFields: null,
        limit: null,
    });
});

test('Execute SQL Query', async () => {
    const query = 'SELECT id, name FROM student';
    const result = await executeSELECTQuery(query);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).not.toHaveProperty('age');
    expect(result[0]).toEqual({ id: '1', name: 'John' });
});

test('Parse SQL Query with WHERE Clause', () => {
    const query = 'SELECT id, name FROM student WHERE age = 25';
    const parsed = parseSelectQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'student',
        groupByFields: null,
        hasAggregateWithoutGroupBy: false,
        isDistinct: false,
        whereClauses: [{
            field: 'age',
            operator: '=',
            value: '25'
        }],
        joinTable: null, // Add this line to match the received output
        joinCondition: null, // Add this line to match the received output
        joinType: null, // Add this line to match the received output
        orderByFields: null,
        limit: null,
    });
});

test('Execute SQL Query with WHERE Clause', async () => {
    const query = 'SELECT id, name FROM student WHERE age = 25';
    const result = await executeSELECTQuery(query);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0].id).toBe('2');
});