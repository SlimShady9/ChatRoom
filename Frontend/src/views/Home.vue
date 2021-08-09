<template>
    <div class="bg-gradient-to-br from-indigo-200 to-pink-200 h-screen grid gap-4 grid-rows-5">
        <div class="grid r bg-pink-300 row-span-1">
            <p class="place-self-center text-4xl text-gray-200 font-bold font-sans text-center">
                Seleccione una sala para unirse
            </p>
        </div>
        <div class="row-span-3 flex flex-col md:flex-row place-content-center gap-12">
            <div class="bg-white grid rounded-lg p-8">
                <div class="place-self-center">
                    <img class="rounded-full w-40 max-h-40"
                    src="../assets/room1.png">
                    <p>Usuarios conectados 2</p>
                </div>
                <button class="self-end">Unirse a la sala 1</button>
            </div>
            <div class="bg-white grid rounded-lg p-8">
                <div class="place-self-center">
                    <img class="rounded-full w-40 max-h-40"
                    src="../assets/room2.png">
                    <p>Usuarios conectados 2</p>
                </div>
                <button class="self-end">Unirse a la sala 2</button>
            </div>
            <div class="bg-white grid rounded-lg p-8">
                <div class="place-self-center">
                    <img class="rounded-full w-40 max-h-40"
                    src="../assets/room3.png">
                    <p>Usuarios conectados 2</p>
                </div>
                <button class="self-end">Unirse a la sala 3</button>
            </div>
        </div>
        <div class="place-self-center">
            <button class="btn-mv">Anterior</button>
            <button class="btn-mv">Siguiente</button>
        </div>

    </div>
</template>