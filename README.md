# ngx-api-orm
Also lovingly called NAO
Some links to get you started:
* [API Documentation](https://maurei.github.io/ngx-api-orm/).
* [NPM Package](https://www.npmjs.com/package/@ngx-api-orm/json-api)

**Note: docs are still under construction.**

A rest api Object Relationship Mapper (ORM) for Angular. Tested with Angular 6.1.x. Can be use used seamlessly with [JSON:api](JsonApi.org) or easibly be adjusted to work with your own format. 

It's aim is to remove as much boilerplate code as possible while allowing for easy extendability. It will empower your models with CRUD functionality and also manages to-one and to-many relationships.

An example of a model would be:

```typescript
@Model()
export class Employee extends Resource {
  @Field()
  public id: number;
  @Field()
  public firstName: string;
  @Field()
  public lastName: string;
  @ToOne(Team)
  public team: ToOneRelation<Employee, Task>;
  @ToMany(Task): 
  public tasks: ToManyRelation<Employee, Task>;

  public mumble(): void {
      console.log('mumble mumble mumble ....')
  }
}

@Model()
export class Task extends Resource {
  @Field()
  public id: number;
  @Field()
  public title: string;
}

@Model()
export class Team extends Resource {
  @Field()
  public id: number;
  @Field()
  public teamName: string;
}
```
Then, common usage will look like

```typescript

/* POST /employees */
const john: Employee = await new Employee().save(); /*  All CRUD methods come with type safety. */

/* GET /employees */
const employees: Array<Employee> = await Employee.fetch(); /* Fetches all from API. */
const someGuy = employees[0];
someGuy.firstName = 'Mike'
someGuy.mumble()  /* 'mumble mumble mumble ....' */

/* PATCH /employees/{id} */
await someGuy.update() /* will only send updated fields */

/* DELETE /employees/{id} */
await someGuy.delete()

/* There will also Task and Team instances available if they were included by the response from GET /employees */
const tasks: Array<Task> = Task.collection();  /* Gets the locally available instances */

/* PATCH /employees/{id}/team  with body {id: 20}  */
await someGuy.team.set( Team.find(20)); //* update the to-one relationship */

/* DELETE /employees/{id}/team */
await someGuy.team.remove(); //* clear the to-one relationship */
someGuy.team.instance === null  /* Will be true */
```

For more detailed information on the available methods and how to use them, see the [model usage guide](additional-documentation/model-usage.html).


## Getting Started
To get started you need the following:
* Install the library
* Import it in your module
* Write a model
* (optional) extend functionality
* use it!

### Installing the library
Using NPM (link to package [here](https://www.npmjs.com/package/@ngx-api-orm/json-api)):
```console
npm install --save @ngx-api-orm/core
```
If you wish to install a specific version, you can use the following format:
```console
npm install --save @ngx-api-orm/core@0.0.1-beta6
```

### Import the library in your module
```typescript
import { HttpClientModule } from '@angular/common/http';
import { ResourceModule, JsonApiDotOrg } from '@ngx-api-orm/core';

@NgModule({
  declarations: [ ... ],
  imports: [ ... ,
    ResourceModule.forRoot({ 
            rootPath: 'https://example.com/api/v1',
            requestHandlers: JsonApiDotOrg /* Requires package @ngx-api-orm/json-api. Omit this line if you're not using a JsonApi.org formatted API.  */
        }),
    HttpClientModule, /* this is required */
    ... ],
  providers: [ ...],
  bootstrap: [ ... ]
})
export class SomeModule {}
```

### Writing Models
See the [model usage guide](https://maurei.github.io/ngx-api-orm/additional-documentation/model-usage.html) for detailed instructions on how to use the `Resource` classes and decorators.

### Extend the functionality where needed
If the `ngx-api-orm` default format or the JsonApi.org format is not what you're getting from your API, see the [extendability guide](/https://maurei.github.io/ngx-api-orm/additional-documentation/extendability.html). This library leverages the power of Angular's dependency injection, making it super easy to override certain default features.



