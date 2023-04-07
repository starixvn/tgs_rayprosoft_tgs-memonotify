using Hangfire;
using Hangfire.MemoryStorage;
using Microsoft.OpenApi.Models;
using Telegram.Bot;
using Tgs.MemoNotify.MessageQueue;

var builder = WebApplication.CreateBuilder(args);

builder.Services
	.AddHttpClient<ITelegramBotClient, TelegramBotClient>((httpClient) => new TelegramBotClient(
		builder.Configuration.GetValue<string>("Bot:Token")!,
		httpClient));

builder.Services
	.AddControllers()
	.Services
	.AddHangfire(config => config
		.UseRecommendedSerializerSettings()
		.UseMemoryStorage())
	.AddHangfireServer();

builder.Services
	.AddMessageQueue()
	.AddNatsMessageQueue(natsConfig => natsConfig
		.ConfigQueueOptions((options, _) => options.Url = builder.Configuration.GetConnectionString("Nats")!)
		.AddHandler<TstMemoNotifyHandler>("tgs.tst.notify", "tgs.tst.notify"))
	.AddNatsGlobPatternExchange("*");

builder.Services
	.AddSwaggerGen(genOptions => genOptions.SwaggerDoc(
		"v1",
		new OpenApiInfo { Title = "Tst Memo Notify", Version = "v1" }));

var app = builder.Build();

app.MapControllers();
app.MapHangfireDashboard();
app.UseSwaggerUI();
app.MapSwagger();

app.Run();
