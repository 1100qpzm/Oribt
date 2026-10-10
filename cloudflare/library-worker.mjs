const SOURCE_ROOT='https://pub-849b22da350243e78d1a5a9186797eb0.r2.dev/level';
const ORIGIN=new URL(SOURCE_ROOT).origin;
export default {
 async fetch(request,env){
  const origin=request.headers.get('Origin');
  const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Vary':'Origin'};
  if(origin===ORIGIN){headers['Access-Control-Allow-Origin']=origin;headers['Access-Control-Allow-Methods']='GET, OPTIONS';}
  const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers});
  if(origin&&origin!==ORIGIN)return reply({error:'Origin not allowed'},403);
  if(new URL(request.url).pathname!=='/songs')return reply({error:'Not found'},404);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(request.method!=='GET')return reply({error:'Method not allowed'},405);
  try{
   const folders=new Map();let cursor;const cursors=new Set();
   do{
    const page=await env.SONGS.list({prefix:'level/',limit:1000,...(cursor?{cursor}:{})});
    for(const obj of page.objects){
     const match=/^level\/([^/]+)\/(.+)$/.exec(obj.key);if(!match)continue;
     const [,directory,name]=match;if(['.','..'].includes(directory)||/[\\\r\n]/.test(directory))continue;
     if(!folders.has(directory))folders.set(directory,new Set());
     if((name==='track.mp3'||name==='maidata.txt')&&obj.size>0)folders.get(directory).add(name);
    }
    cursor=page.truncated?page.cursor:undefined;
    if(page.truncated&&(!cursor||cursors.has(cursor)))throw Error('Invalid listing cursor');
    if(cursor)cursors.add(cursor);
   }while(cursor);
   const songs=[],incomplete=[];
   for(const [directory,files]of [...folders].sort(([a],[b])=>a.localeCompare(b))){const missing=['track.mp3','maidata.txt'].filter(name=>!files.has(name));if(missing.length)incomplete.push({directory,missing});else songs.push({directory});}
   return reply({version:1,sourceRoot:SOURCE_ROOT,songs,incomplete,scannedAt:new Date().toISOString()});
  }catch(error){console.error('Catalog listing failed',error);return reply({error:'Could not list song folders. Retry later.'},503);}
 }
};
