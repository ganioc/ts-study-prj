## How to use the lib reflect-metadata?
give some trying.



## Basic code

```javascript

export const controllerList: ControllerType[] = [];

// 简单的收集依赖
export function Controller(path=''): ClassDecorator{
    return (target:object) =>{
        controllerList.push({path, target})
    }
}

// http 请求装饰器
export type HttpMethod = 'get'|'post'|'put'|'delete'|'patch'
export const routeList: RouteType[] = [];

export function createMethodDecorator(method: HttpMethod='get'){
    return (path='/'):MethodDecorator =>
    (target:object, name: string, descriptor: any)=>{
        routeList.push({type:method, target, name, path, func:descriptor.value})
    }
}

export const Get = createMethodDecorator('get')
export const Post = createMethodDecorator('post')

// params 装饰器

// 类型装饰器
export type Parse = 'number'|'string'|'boolean'
export const parseList :ParseType[] = []
export function Parse(type:Parse): ParameterDecorator{
    return (target: object, name: string, index: number) =>{
        parseList.push({type, index, name})
    }
}

// 装饰器注入
// 3层遍历注入
const router = express.Router();

controllerList.forEach(controller =>{
    const {path:basePath, target: cTarget} = controller;
    routeList
        .filter(({target}) => target === cTarget.prototype)
        .forEach(route =>{
            const {name: funcName, type, path, func} = route;
            const handler = handlerFactory(
                func,
                paramList.filter(param => param.name === funcName),
                parseList.filter(parse => parse.name === funcName)
            )
            router[type](basePath + path, handler);
        })
})

app.use('/', router)

// 路由处理函数工厂

export function handlerFactory(func: (...args:any[]) => any, paramList: ParamType[], parseList: ParseType){
    return async(req:Request, res: Response, next:NextFunction) =>{
        try{
            const args = extractParameters(req, res, next, paramList, parseList)
            const result = await func(...args)
            res.send(result)
        }catch(e){
            next(err)
        }
    }
}

// 根据req处理装饰的结果
export function extractParameters(
    req: Request,
    res: Response,
    next: NextFunction,
    paramArr: ParamType[]=[]
    parseArr: ParseType[]= []
){
    if(!paramArr.length) return [req, res, next];
    const args = [];

    // 进行第3遍的遍历
    paramArr.forEach(param =>{
        const {key,index,type} = param;
        // @Query('id') 则为req.query.id
        switch(type){
            case 'query':
                args[index]= key?req.query[key]: req.query;
                break;
            case 'body':
                args[index] = key? req.body[key]: req.body
                break;
            case 'headers':
                args[index] = key? req.headers[key.toLowerCase()]: req.headers;
                break;
        }
    })
    parseArr.forEach(parse =>{
        const {type, index} = parse,
        switch(type){
            case 'number':
                args[index] = args[index];
                break;
            case 'string':
                args[index] = args[index]+''
                break;
            case 'boolean':
                args[index] = Boolean(args[index])
                break;
        }
    })

    args.push(req, res, next)
    return args;
}

@Controller('/')
export default class Index{
    @Get('/')
    index(@Parse('number') @Query('id') id: number){
        return {code: 200, id, message: 'success'}
    }

    @Post('/login')
    login(
        @Headers('authorization') auth:string,
        @Body() body:{name: string, password:string},
        @Body('name') name:string,
        @Body('password') psd: string,

    ){
        console.log(body, auth);
        if(name !== 'lawler' || psd !== '111111'){
            return {code:400, message: 'auth failed'}
        }
        return {code: 200, token:'111111', message:'success'}
    }
}


```

## Use Reflect Metadata

```typescript

// 定义装饰器
export const CONTROLLER_METADATA = 'controller';
export const ROUTE_METADATA = 'method';
export const PARAM_METADATA = 'param';

export function Controller(path=''):ClassDecorator{
    return (target:object)=>{
        Reflect.defineMetadata(CONTROLLER_METADATA,path,target)
    }
}
export function createMethodDecorator(method: HttpMethod='get'){
    return (path = '/'):MethodDecorator =>
    (target:object, name: string, descriptor:any)=>{
        Reflect.defineMetadata(ROUTE_METADATA, {type:method,path}, descriptr.value)
    }
}
export function createParamDecorator(type:Param){
    return(key?:string):ParameterDecorator =>
    (target:object, name:string, index:number)=>{
        const preMetadata =
            Reflect.getMetadata(PARAM_METADATA, target,name)|| [];
        const newMetadata =
            [{key, index, type}, ...preMetadata];

        Reflect.defineMetadata(PARAM_METADATA, newMetadata, target, name)
    }
}

// 装饰器注入
const router = express.Router()

const controllerStore = {
    index: new IndexController(),
    user: new UserController()
}

Object.values(controllerStore).forEach(instance =>{
    const controllerMetadata: string = Reflect.getMetadata(CONTROLLER_METADATA, instance.constructor);

    const proto = Object.getPrototypeOf(instance);

    const routeNameArr = Object.getOwnPropertyNames(proto).filter(
        n=>n!== 'constructor' && typeof proto[n] === 'function'
    )

    routeNameArr.forEach(routeName =>{
        const routeMetadata: RouteType = Reflect.getMetadata(ROUTE_METADATA, proto[routeName])
        const {type, path} = routeMetadata;
        const handler = handlerFactory(
            proto[routeName],
            Reflect.getMetadata(PARAM_METADATA, instance, routeName),
            Reflect.getMetadata(PARSE_METADATA, instance, routeName),
        )
        route[type](controllerMetadata + path, handler)
    })
})
```


