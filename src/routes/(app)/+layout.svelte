<script lang="ts">
    // Props
    const { children } = $props();
</script>

<nav class="mb-4 bg-slate-100">
    <div class="container flex items-center justify-between py-4">
        <h1 class="mb-0">Sails</h1>

        <div class="flex gap-2">
            <a href="/login" role="button">Login</a>
            <a href="/register" role="button">Register</a>
        </div>
    </div>
</nav>

<main class="container">
    {@render children()}
</main>
