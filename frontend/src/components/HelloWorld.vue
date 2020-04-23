<template>
  <div class="hello">    
    <form method="POST" action="/auth/register">
      <input type="text" name="username">
      <input type="password" name="password">
      <input type="submit" value="Register" />
    </form>
    <hr>
    <form method="POST" action="/auth/login">
      <input type="text" name="username">
      <input type="password" name="password">
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
