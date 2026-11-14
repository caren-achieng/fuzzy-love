// Each row is one fixed fictional profile. Indices refer to the labelled choices below.
const options = {
  "Relationship goal":["Long-term partner","Long-term, open to short-term","Short-term, open to long-term","Short-term fun","New friends","Still figuring it out"],
  "Family plans":["Want children","Have children and want more","Unsure","Don't want children","Have children and don't want more"],
  "Communication":["Texting","Phone calls","Video chats","In person","Infrequent texting"],
  "Love style":["Thoughtful gestures","Presents","Touch","Compliments","Time together"],
  "Pets":["Dog","Cat","Reptile","Amphibian","Bird","Fish","No pets, but love them","Other","Turtle","Hamster","Rabbit","Pet-free","Several pets","Want a pet","Allergic to pets"],
  "Drinking":["Never","Newly teetotal","Sober curious","Special occasions","Socially at weekends","Most nights"],
  "Smoking":["Non-smoker","Social smoker","Only when drinking","Smoker","Trying to quit"],
  "Workout":["Never","Sometimes","Often","Every day"],
  "Social media":["Off the grid","Passive scroller","Socially active","Influencer"],
  "Education":["High school","Trade school","At university","Bachelor’s","Graduate programme","Master’s","PhD"],
  "Zodiac":["Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"]
};
const fields=Object.keys(options);
const rows=[
["Maya","Woman",27,14,"I plan weekends around a hike and a bakery.",[0,0,0,4,0,3,0,2,1,5,2],"Hiking,Coffee","English,French",3],
["Luca","Man",31,32,"Making fresh pasta is my favourite Sunday ritual.",[1,1,1,0,1,4,1,1,2,1,6],"Cooking,Photography","Italian,French",4],
["Noor","Nonbinary",25,9,"Always up for a museum and a very slow coffee.",[4,2,3,4,6,0,0,1,0,2,0],"Art,Coffee","Arabic,English",2],
["Eli","Man",29,52,"Ask me about the album I keep playing on repeat.",[0,2,2,3,11,1,0,2,1,3,8],"Music,Hiking","German,English",5],
["Inès","Woman",34,25,"My dog comes with me on almost every lake walk.",[0,4,1,4,0,3,4,1,2,5,3],"Hiking,Art","French,Spanish",2],
["Sam","Nonbinary",24,18,"Usually dancing or planning the next gig.",[2,3,0,2,13,4,2,3,3,3,5],"Dancing,Music","English,Swahili",4],
["Theo","Man",38,61,"",[3,4,3,2,4,5,3,0,0,0,9],"Gaming,Cooking","French,German",1],
["Amina","Woman",30,45,"I keep a sketchbook in every bag.",[1,0,2,0,10,2,0,2,2,4,7],"Art,Photography","Swahili,English",3],
["Jo","Nonbinary",28,6,"Board games and coffee are my ideal first date.",[5,3,4,1,1,0,1,0,1,6,4],"Gaming,Coffee","French,English",2],
["Leon","Man",42,77,"I teach salsa on Thursday nights.",[2,1,3,3,5,4,0,3,2,1,10],"Dancing,Cooking","Spanish,Italian",5]
];
const people=rows.map(([name,gender,age,km,bio,indices,interests,languages,photos])=>({
 name,gender,age,km,bio,photos,Interests:interests.split(','),Languages:languages.split(','),
 ...Object.fromEntries(fields.map((f,i)=>[f,options[f][indices[i]]]))
}));
// Explicit prototype assumptions. Unlisted categorical pairs offer no partial credit.
const neighbours={
 "Relationship goal":[[0,1,.8],[1,2,.6],[2,3,.8],[0,2,.35],[1,3,.35]],
 "Family plans":[[0,1,.75],[3,4,.75]],
 "Communication":[[1,2,.65]],"Drinking":[[0,1,1],[3,4,.6],[4,5,.35]],
 "Smoking":[[1,2,.75]],"Pets":[[6,13,.7]]
};
function degree(field,desired,person){
 const actual=person[field];
 if(field==="Age" || field==="Distance" || field==="Photos"){
   let gap, tolerance;
   if(field==="Age"){gap=Math.max(desired[0]-person.age,person.age-desired[1],0); tolerance=5}
   if(field==="Distance"){gap=Math.max(0,person.km-desired); tolerance=20}
   if(field==="Photos"){gap=Math.max(0,desired-person.photos); tolerance=3}
   return [Math.max(0,1-gap/tolerance),Number(gap===0)];
 }
 if(field==="Bio") return [Number(!!person.bio),Number(!!person.bio)];
 if(Array.isArray(actual)){
   const count=desired.filter(v=>actual.includes(v)).length;
   return [count/desired.length,Number(count===desired.length)];
 }
 if(actual===desired)return [1,1];
 const a=options[field].indexOf(actual), b=options[field].indexOf(desired);
 if(field==="Workout")return [1-Math.abs(a-b)/3,0];
 for(const [x,y,val] of neighbours[field]||[]){
   if((a===x&&b===y)||(a===y&&b===x))return [val,0];
 }
 return [0,0];
}
// Zero-order Sugeno rules. Triangular low/medium/high memberships sum to one.
// Joint rule strength is the product of memberships for priority fit and overall fit.
function membership(x){return [Math.max(0,1-2*x),1-Math.abs(2*x-1),Math.max(0,2*x-1)]}
function rank(prefs,priority,gender){
 const outputs=[[0,25,50],[20,50,77],[40,76,100]];
 return people.filter(p=>gender==="Everyone"||p.gender===gender).map(p=>{
   const details=Object.entries(prefs).map(([field,want])=>({field,fit:degree(field,want,p)}));
   const mean=i=>details.reduce((s,d)=>s+d.fit[i],0)/details.length;
   const overall=mean(0), top=details.find(d=>d.field===priority);
   const weights=membership(top?top.fit[0]:overall), levels=membership(overall);
   const fuzzy=outputs.reduce((sum,row,i)=>sum+row.reduce((s,v,j)=>s+weights[i]*levels[j]*v,0),0);
   return {p,fuzzy,strict:100*mean(1),details};
 });
}
