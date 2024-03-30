<template>
  <h1>Ultimate Aesthetics Test</h1><br>
    <div class="largebody">
      <p>This test is totally WIP but you can already feel free to pick your next personality based on what it says :3 Enjoy!</p>
      <div class="flex_container">
        <div class="questions">
          <div v-if="current_question < questions_data.length" class="question" id="question">
            {{ questions_data[current_question].question }}<br><br>
            <ul>
              <div v-for="(answer, index) in questions_data[current_question].answers" :key="answer">
                <li><button @click="compute_results(index)">{{ answer.text }}</button></li>
              </div>
              <li><button @click="compute_results(-1)">None of the above</button></li>
            </ul>
          </div>
          <div v-else class="question">
            <b>You finished the quiz: check out the results to the right!</b><br>
            Your most matching aesthetic is <b>{{ aesthetics_names[sorted_results[0]["key"]] }}</b><br><br>
            <img :src="require('../assets/img/aesthetics/'+sorted_results[0]['key']+'.jpg')">
          </div>
        </div>
        <div class="results">
          <div v-if="results_exist" :style="{ 'background-image': 'url(' + require('../assets/img/aesthetics/'+sorted_results[0]['key']+'.jpg') + ')'}" class="results_display">
            <b>Aesthetics that match your answers the best:</b><br><br>
            <div v-for="(aesthetic, index) in sorted_results" :key="aesthetic" class="bar" :style="{ width: (100 * sorted_results[index]['val'] / sorted_results[0]['val']) + '%'}">
              <div v-if="sorted_results[index]['val'] > 0" class="name">
                {{ aesthetics_names[aesthetic["key"]] }}
              </div>
            </div>
            <img :src="require('../assets/img/aesthetics/'+sorted_results[0]['key']+'.jpg')" :alt="sorted_results[0]['key']" class="result_image" />
          </div>
          <div v-else>
            <b>No result yet!</b>
          </div>
        </div>
      </div>
    </div>
    
</template>

<script>
  import aestheticsData from "../assets/data/aesthetics.json";
  import questionsData from "../assets/data/questions.json";
  
  export default {
    name: 'AestheticsTest',
    data() {
      return {
        aesthetics_data: aestheticsData,
        questions_data: questionsData,
        aesthetics_names: [],
        current_question: 0,
        all_results: {},
        sorted_results: [],
        results_exist: false,
      }
    },
    methods: {
      results_not_null() {
        let found_result = false;
        Object.keys(this.all_results).forEach(key => {
          if (this.all_results[key] > 0) 
          { 
            found_result = true; }
        });
        return found_result;
      },

      init_results() {
        this.aesthetics_data.forEach(aesthetic => this.all_results[aesthetic.id] = 0);
      },

      init_aesthetic_names() {
        this.aesthetics_data.forEach(aesthetic => this.aesthetics_names[aesthetic.id] = aesthetic.name);
        console.log(this.aesthetics_names);
      },

      compute_results(answerId) {
        if (answerId != -1) {
          let answer_result_aesthetics = this.questions_data[this.current_question].answers[answerId].aesthetics;
          answer_result_aesthetics.forEach(aesthetic_id => this.all_results[aesthetic_id]++);
          
          console.log("Results updated");
          this.results_exist = this.results_not_null();
          
          console.log("Results not null");
          this.sorted_results = this.sort_results(this.all_results);
          console.log("Results sorted");
        }
        this.current_question++;
        console.log("Question number updated")
        return this.all_results;
      },

      sort_results(results) {
        let results_array = [];

        Object.keys(results).forEach(name => results_array.push({"key": name, "val":results[name]}));
        results_array = this.quicksort_results(results_array);
        results_array.forEach(val => this.sorted_results[val["key"]] = val["val"]);
        return results_array;
      },

      quicksort_results(results_array) {
        if (results_array.length <= 1) {
          return results_array;
        }

        var pivot = results_array[0]["val"];

        var left = []; 
        var right = [];

        for (var i = 1; i < results_array.length; i++) {
          var val_curr = results_array[i]["val"];
          val_curr > pivot ? left.push(results_array[i]) : right.push(results_array[i]);
        }

        return this.quicksort_results(left).concat(results_array[0], this.quicksort_results(right));
      }
    },
    created() {
     this.init_results();
     this.init_aesthetic_names();
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  @import "../css/uat.css";
  
</style>