<script>
    import {Loader2} from "@steeze-ui/lucide-icons";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {slide, fade} from "svelte/transition"
</script>

<div class="h-screen w-screen m-auto flex flex-col items-center align-middle justify-center" in:slide out:fade>
    <div class="flex flex-row items-center gap-2 animate-bounce transition ease-in-out duration-500 select-none">
        <Icon src={Loader2} class="w-5"/>
        <h1 class="font-semibold text-3xl lowercase">Notie<span class="text-blue-400">.</span></h1>
    </div>
</div>