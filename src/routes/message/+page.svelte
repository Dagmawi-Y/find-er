<script>
  import { onMount } from "svelte";
  import io from "socket.io-client";

  /**
   * @type {import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>}
   */
  let socket;
  let messageInput = "";
  /**
   * @type {any[]}
   */
  let messages = [];
  let conversationId = 1;
  const senderId = 1;
  const serverUrl = "http://localhost:3333";

  onMount(() => {
    socket = io(serverUrl, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinRoom", { conversationId });
    });

    socket.on("conversationJoined", (data) => {
      console.log("Joined conversation:", data);
    });

    socket.on("newMessage", (message) => {
      messages = [...messages, message];
      console.log(messages);
    });
  });

  const sendMessage = () => {
    if (messageInput.trim()) {
      socket.emit("sendMessage", {
        senderId,
        conversationId,
        content: messageInput,
      });
      messageInput = "";
    }
  };
</script>

<!-- Same chat UI as before -->

<div class="flex flex-col h-screen">
  <!-- Chat Header -->
  <div
    class="bg-indigo-600 py-4 px-6 text-white flex items-center justify-between"
  >
    <h2 class="text-lg font-semibold">Chat</h2>
    <div class="avatar online">
      <div class="w-8 rounded-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          alt="User Avatar"
        />
      </div>
    </div>
  </div>

  <!-- Chat Messages -->
  <div class="flex-grow overflow-y-auto p-4">
    {#each messages as message}
      <div
        class="mb-4 flex {message.senderId === 1
          ? 'justify-end'
          : 'justify-start'}"
      >
        <div
          class="max-w-xs rounded-lg p-3 {message.senderId === 1
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200'}"
        >
          <p class="text-sm">{message.content}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Chat Input -->
  <div class="bg-white p-4 flex items-center">
    <input
      type="text"
      placeholder="Type your message..."
      class="flex-grow border rounded-lg px-4 py-2 mr-2"
      bind:value={messageInput}
      on:keydown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button
      class="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors duration-300"
      on:click={sendMessage}
    >
      Send
    </button>
  </div>
</div>
