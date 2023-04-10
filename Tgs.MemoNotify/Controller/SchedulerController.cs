using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Tgs.MemoNotify.ViewModels;

namespace Tgs.MemoNotify.Controller;

[Route("api/[controller]")]
[ApiController]
public class SchedulerController : ControllerBase
{
	[HttpPut]
	[Produces("application/json")]
	public string ScheduleNotify(
		IBackgroundJobClient backgroundJobClient,
		MemoViewModel viewModel)
	{
		var payload = new TstMemoNotify(
			viewModel.Title,
			viewModel.Description,
			viewModel.ScheduleTime,
			viewModel.GameProviderCodes);

		return backgroundJobClient.Schedule<NotifyScheduleJob>(
			job => job.ExecuteAsync(
				$"Schedule Notify - {viewModel.Title} - {Guid.NewGuid()}",
				"tgs.tst.notify",
				viewModel.ScheduleTime,
				payload,
				default),
			viewModel.ScheduleTime);
	}
}
