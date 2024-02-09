<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparse Matrix Search</title>
</head>
<body>
    <div class="container">
        <h1>Sparse Matrix Search</h1>
        <form id="matrixForm">
            <label for="matrix">Enter Sparse Matrix:</label>
            <textarea id="matrix" name="matrix" rows="5" cols="50" placeholder="Enter your matrix here..."></textarea>
            <label for="pincodes">Enter Pincode(s) to Search for:</label>
            <input type="text" id="pincodes" name="pincodes" placeholder="Enter pincode(s) separated by comma...">
            <button type="submit">Search</button>
        </form>
        <div id="searchResults">
            <!-- Search results will be displayed here -->
        </div>
    </div>
   
</body>

<style>
	body {
    font-family: Arial, sans-serif;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

textarea,
input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

#searchResults {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>