# Model usage guide

  
This guide works through the basics of defining your models. We will consider an example of three models: `Employee`, `Task` and `Team`. Each `Employee` belongs to one `Team`, and an `Employee` may have multiple `Task`s.

 You probably also will need to check the [default API format](/additional-documentation/default-api-format-examples.html) that is assumed for these examples.

## Declaring models
### Standard declarations
The most straight forward way to implement the three models is as below.
```ts
@ResourceModel()
export class Employee extends Resource {
	@ResourceField()
	public id: number;
	@ResourceField()
	public firstName: string;
	@ResourceField()
	public lastName: string;
	@ResourceToOne(Team)
	public team: ToOneRelation<Employee, Task>;
	@ResourceToMany(Task):
	public tasks: ToManyRelation<Employee, Task>;
}

@ResourceModel()
export class Task extends Resource {
	@ResourceField()
	public id: number;
	@ResourceField()
	public title: string;
}

@ResourceModel()
export class Team extends Resource {
	@ResourceField()
	public id: number;
	@ResourceField()
	public teamName: string;
}
```
For such models, the following methods will available:
*	Static methods: `Team.fetch`, `Team.collection`, `Team.find`, `Team.template`.
*	Instance classes: `team.save`, `team.update`, `team.delete`.
*	For to-one fields: `employee.team.set`, `employee.team.remove`, `employee.team.sync`.
*	For to-many fields: `employee.workItems.add`, `employee.workItems.remove`

See the [API docs](/classes/Resource.html) for detailed specifications of these functions. If you need to know which requests are made exactly and how to change this, see the [extendability guide](/additional-documentation/extendability.html). Some more examples on how to use these methods are included below in the final part of this document.

A few things to keep in mind:
* Models must extend `Resource`.
* Use the `@ResourceField()` decorator to link a field to a plain property in the API response.
* the `id` field is required and also requires `@ResourceField()`. It can be a `string` or `number`.
* Use `@ResourceToOne(TRelated)` and  `@ResourceToMany(TRelated)` to mark fields as to-one and to-many relationships respectively.
* Relationship fields must be of type `ToOneRelation<THost, TRelated>` or `ToManyRelation<THost, TRelated>`.


### Optional configuration
Perhaps your model isn't perfectly matching your API response. Some easy fixes can be done in the model. The following model below works with [this  default response example with property mismatches](/additional-documentation/default-api-format-examples.html).
```ts
@ResourceModel()
export class Employee extends Resource {
	@ResourceField()
	public id: number;
	@ResourceField('givenName')
	public firstName: string;
	@ResourceField('familyName')
	public lastName: string;
	@ResourceToOne(Team)
	public team: ToOneRelation<Employee, Task>;
	@ResourceToMany(Task, 'assignments'):
	public workItems: ToManyRelation<Employee, Task>;
}

@ResourceModel({name: 'WorkItem'}) /* Putting 'work-items' has the same effect'. */
export class Task extends Resource {
	@ResourceField()
	public id: number;
	@ResourceField()
	public title: string;
}

@ResourceModel()
export class Team extends Resource {
	@ResourceField()
	public id: number;
	@ResourceField()
	public teamName: string;
}
```
A few things to notice:
* `@ResourceField('givenName') public firstName: string;`will link `employee.firstName` to `employee.givenName`  when parsing the API response.
* Similarly, 	`@ResourceToMany(Task, 'assignments'): public workItems` will look for a `assignments` property in the API response and treat it as the contents for, in this case, the to-many relationship with `Task`.
* `@ResourceModel({name: 'WorkItem'}) ` matches the local`Task` model to a `WorkItem` resource in the API. This results in for example:
	* `Task.fetch()`  using the url `/work-items/`.
	*  `employeeWithId2.tasks.add( ... ) ` using the url `/employees/2/work-items `.
	* Note the "s" in `work-itemS`. If this were a to-one relation, the url would have singular, i.e. `work-item`. 

## Adding business logic to your models

You can add business logic to your class declarations.
```ts
@ResourceModel()
export class Employee extends Resource {
	@ResourceField()
	public id: number;
	...
	...
	public fullName: string;
	/* Custom request using built-in fetch */
	public async static fetchWithId(id: number): Promise<Employee> {
		const options: HttpClientOptions = {
			params: new HttpParams().set('id', id)
			url: '/special-route-override'
		}
		const result = await this.fetch(options)
		return result[0];
	}

	/* Initialization logic: it is better to leave the constructor alone. */
	public onInit(rawInstance: RawInstanceTemplate<Employee>): void {
		this.fullName = rawInstance.firstName + ' ' + rawInstance.lastName
	}
	public complain(): void {
		console.log('My days are too long...');
	}
}

```
Note that 
* You shouldn't override the `constructor` unless you know what you're doing. Overloading it wrongly will result in it not working correctly with Angular's dependency injection. Any logic you'd normally put in the constructor can probably go into `onInit`.
* You can add fields and methods to your model like you normally would with a class definition.

## Working with instances of your models

### Creating and saving instances
There are two ways to create a new instance of your model.
```ts
/* First method, using a raw instance template */
const template = Employee.template();  // gets a RawInstanceTemplate<Employee> object
template.firstName = 'John';
template.lastName = 'Williams';
const localInstance = new Employee(employeeTemplate);

/* Second method, using no template */
const localInstance = new Employee();
localInstance.firstName = 'John';
localInstance.lastName = 'Williams';

/* This will not work */
const error = new Employee({firstName: 'John', lastName: 'Williams'})
```
* In the first example, a plain object with the public properties of Employee is retrieved. An instance can then be instantiated from this template.
* In the second example, no template is given. Internally, the constructor will call the static template function to set the properties of the object.
* The last example will not work because some properties are missing: `team` and `tasks`. When passing along a object template, it is required that all fields (the ones that are decorated with `ResourceModel`,  `ResourceToOne` and `ResourceToMany`  are present.

The local instance can now be saved.
```ts
localInstance.id === undefined // true
Employee.collection().length === 0 // true
const savedInstance = await localInstance.save()
savedInstance.id === undefined // false: it should get an id from the API.
Employee.collection().length === 0 // false: only instances that have an id are added to the internal collection.
Employee.collection().length === 1 // true.
Employee.collection()[0] === savedInstance // true
```
*  Note that `collection` gets the list of available local instances. Only the instances that have an id are included, i.e. unsaved local instances are not in this list.

### Updating and deleting instances
We can update and delete instances as follows.
```ts
/* updating */
console.log(employee.firstName) // 'John'
employee.firstName = 'Johnny'
await localInstance.update() // only sends the fields that are updated, in this case 'firstName'

employee.lastName = 'Bravo'
await localInstance.update() // only sends the fields that are updated, in this case 'lastName'

/* deleting */
await employee.delete();
Employee.collection().includes(employee) // false
```
*  When deleting is complete, the corresponding instance is deleted from the list.

### Adding and removing to-one and to-many relations
In our example, our `Employee` instance has a to-one relation with `Team` and a to-many relation with `Task`. The related instances of `Team` and `Task` are stored in `ToOneRelation` and `ToMany` containers, respectively. Because there is only **one** `Team`  instance related to an `Employee` instance,  the `ToOneRelation` container is `Object`-like, whereas `ToManyRelation` container is `Array`-like.

These are some operations with to-one relations involved.
```ts
/* to-one relations */
employee.team.length // undefined: it's not array like
const team = employee.team.instance // accessing the instance reference of class Team.
await employee.team.set( someOtherTeam )
employee.team.instance === team // false
employee.team.instance === someOtherTeam // true
await employee.team.remove()
employee.team.instance === null // true

/* also possible to directly set the instance reference */
employee.team.instance = someOtherTeam;
await employee.team.sync(); // effectively the same as .set(someOtherTeam)
employee.team.instance = null;
await employee.team.sync(); // effectively the same as .set(null)
```
* The instance inside the `ToOneRelation` container can be access as `.instance`.
* Clearing a relationship does not delete the related instance. I.e. `Team.collection()` is invariant under the above operations.
*  "Lazy setting" is supported with `.sync`.

These are some operations with to-many relations involved.

```ts
/* to-many relations */
employee.team.length // defined, a number.
const team = employee.team[2] // accessing one of related instances of class Task
await employee.tasks.add( assignment )
employee.tasks.includes(assignment) // true
await employee.tasks.remove( oldAssignment)
employee.tasks.includes(oldAssignment) // false
/* WARNING: NOT YET IMPLEMENTED */
employee.tasks.pop(); // this is coming in the next release!
employee.tasks.push( ..assignments ); // this is coming in the next release!
await employee.tasks.sync(); // this is coming in the next release!
```
*  "Lazy setting" is **NOT** yet supported.

#### Extendability
If you need to know or change to which HTTP verbs  the actions `add, remove, delete, update, save, fetch` are linked, now would be a good time to check out the [extendability guide](/additional-documentation/extendability.html).