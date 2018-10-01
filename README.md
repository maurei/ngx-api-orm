# ngx-api-orm

#### Note: docs are still under construction.

A rest api orm for Angular. Tested with Angular 6.1.x. Can be use used seamlessly with JsonApi.org or easibly be adjusted to work with your own format. 

It aims to remove as much boilerplate code as possible while allowing for easy extendability. It will empower your models with CRUD functionality and also manages to-one and to-many relationships.

Your models will look something like

```js
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


Then, some common usage will look like


```js

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

### Install the library
Using npm:
```console
npm install --save-dev @ngx-api-orm/core
```

### Import the library in your module
```js
import { HttpClientModule } from '@angular/common/http';
import { ResourceModule, JsonApiDotOrg } from '@ngx-api-orm/core';


@NgModule({
  declarations: [ ... ],
  imports: [ ... ,
    ResourceModule.forRoot({ 
            rootPath: 'https://example.com/api/v1',
            requestHandlers: JsonApiDotOrg /* Requires package @ngx-api-orm/json-api. Omit this line if you're not using a JsonApi.org formatted API.  */
        }),
    HttpClientModule, /* this one is required */
    ... ],
  providers: [ ...],
  bootstrap: [ ... ]
})
export class SomeModule {}
```

### Write some models
See the [model usage guide](https://maurei.github.io/ngx-api-orm/additional-documentation/model-usage.html) for detailed instructions on how to use the `Resource` classes and decorators.

### Extend the functionality where needed
If the `ngx-api-orm` default format or the JsonApi.org format is not what you're getting from your API, see the [extendability guide](/https://maurei.github.io/ngx-api-orm/additional-documentation/extendability.html). This library leverages the power of Angular's dependency injection, making it super easy to override certain default features.

### Check out the API docs to learn more
[They're right here](https://maurei.github.io/ngx-api-orm/documentation).

