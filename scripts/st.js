(function(window){
    //I recommend this
    'use strict';
    function define_st(){
        var st = {};
        var author = "Yang HonJang";
        st.version = function(){
            return "Ver 0.01";
        }
        st.author=function(){
            return author;
        }
        st.sample=sample;
        st.valueCount=valueCount;
        st.countFrequency=countFrequency;
        st.mean=mean;
        st.sd=sd;
        return st;
    }
    function sample(population,samplesize){ //population=[{v:value),p:probability},{},...]
        var cump=[population[0].p];
        for (var i=1;i<population.length;i++) cump.push(population[i].p+cump[i-1]);
        for (var i=0;i<population.length;i++) cump[i]=cump[i]/cump[cump.length-1];  // normalize
        var res=[];
        for (var i=0;i<samplesize;i++) {
            var v=Math.random();
            for (var j=0;j<cump.length;j++){
                if (v<=cump[j]){
                    res.push(population[j].v);
                    break;
                }
            }
        }
        return res;   
    }
    function valueCount(values){
        values=values.sort(function(a,b){return a-b;});
        var vcs=[{value:values[0],count:1}];
        var ind=0;
        for (var i=1;i<values.length;i++){
            if(values[i]==vcs[ind].value){
                vcs[ind].count++;
            } else {
                vcs.push({value:values[i],count:1});
                ind++;
            }
        }
        return vcs;
    }
    function mean(population){
        var sum=0;
        for (var i=0;i<population.length;i++) sum+=population[i].v*parseFloat(population[i].p);
        return sum;
    }
    function sd(population){
        var sum=0;
        for (var i=0;i<population.length;i++) 
            sum+=(population[i].v)*(population[i].v)*parseFloat(population[i].p);
        var mu=mean(population);
        return Math.sqrt(sum-mu*mu);
    }

    function countFrequency(vcs,left,right,bins){
        vcs=vcs.sort(function(a,b){return a.value-b.value;})
        var res=[];
        for (var i = 0; i < bins; i++) {
            res.push({member:[],count:[],total:0});
        }
        var step=(right-left)/bins;
        for (var i = 0; i < vcs.length; i++) {
            var ind = Math.ceil((vcs[i].value - left) / step);
            if (ind==0 && vcs[i].value==left) ind=1;  // first bin include left limit
            ind=ind-1;
            res[ind].total+=vcs[i].count;
            var count=res[ind].member.length;
            if (count>0 && vcs[i].value==res[ind].member[count-1]){
                res[ind].count[count-1]=res[ind].count[count-1]+vcs[i].count;
            } else {
                res[ind].member.push(vcs[i].value);
                res[ind].count.push(vcs[i].count);
            }
        }
        for (var i = 0; i < bins; i++) {
            var s="";
            for (var j=0;j<res[i].member.length;j++){
                if (res[i].count[j]>1){
                    s=s+res[i].member[j]+'('+res[i].count[j]+')';
                }
                else
                    s=s+res[i].member[j]+' ';
            }
            res[i].tips=s;
        }
        return res;
    }

    //define globally if it doesn't already exist
    if(typeof(st) === 'undefined'){
        window.st = define_st();
    }
    else{
        console.log("st already defined.");
    }
})(window);