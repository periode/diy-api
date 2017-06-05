//JSON is a nice way to organize data
var person = {
	'first_name': 'Erik',
	'last_name': 'Prince',
	'countries_of_action': [
		'United Arab Emirates',
		'South Sudan',
		'Iraq',
		'Afghanistan',
		'Somalia']
};

console.log(person.first_name); //outputs 'Erik'
console.log(person.countries_of_action); //outputs '['United Arab Emirates', 'South Sudan', 'Iraq', 'Afghanistan', 'Somalia']'
console.log(person.countries_of_action[0]); //outputs 'United Arab Emirates'
