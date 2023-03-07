import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

class customProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `TypeScript ${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [customProcessor]
  })
);
export default SuiteInfo;
