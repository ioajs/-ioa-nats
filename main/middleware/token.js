export default async function (ctx, next) {

   ctx.token = "token middleware";

   await next();
   
}