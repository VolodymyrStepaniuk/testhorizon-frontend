// Dashboard.tsx
import { Grid, Typography } from "@mui/material";
import ExpandableCategory from "./ExpandableCategory";

// Імпортуємо наші компоненти-рендерери та їх інтерфейси
import ProjectItem from "./dashboard-items/ProjectItem";
import TestCaseItem from "./dashboard-items/TestCaseItem";
import TestItem from "./dashboard-items/TestItem";
import BugReportItem from "./dashboard-items/BugReportItem";
import { BugReport } from "../../../models/BugReport";
import { Test } from "../../../models/Test";
import { TestCase } from "../../../models/TestCase";
import { useProjectsQuery } from "../../../queries/ProjectQueries";
// Dummy дані

const dummyTestCases: TestCase[] = [
  {
    id: 1,
    title: "Тест кейс для авторизації",
    steps: "Ввести логін і пароль",
    expectedResult: "Успішний вхід",
    description: "Перевірка стандартної форми авторизації",
  },
  {
    id: 2,
    title: "Тест кейс для реєстрації",
    steps: "Заповнити форму",
    expectedResult: "Створено акаунт",
  },
  {
    id: 3,
    title: "Тест кейс для відновлення паролю",
    steps: "Надіслати запит",
    expectedResult: "Отримано email",
  },
  {
    id: 4,
    title: "Тест кейс для кошика",
    steps: "Додати товар",
    expectedResult: "Товар у кошику",
  },
  {
    id: 5,
    title: "Тест кейс для оплати",
    steps: "Оплатити товар",
    expectedResult: "Оплата успішна",
  },
  {
    id: 6,
    title: "Тест кейс для відгуків",
    steps: "Залишити відгук",
    expectedResult: "Відгук опубліковано",
    description: "Перевірка функціоналу відгуків",
  },
];

const dummyTests: Test[] = [
  { id: 1, title: "Тест функціональності входу", result: "Pass" },
  { id: 2, title: "Тест реєстрації", result: "Fail" },
  { id: 3, title: "Тест відновлення паролю", result: "Pass" },
  { id: 4, title: "Тест кошика", result: "Pass" },
  { id: 5, title: "Тест оплати", result: "Fail" },
  { id: 6, title: "Тест відгуків", result: "Pass" },
];

const dummyBugReports: BugReport[] = [
  {
    id: 1,
    title: "Баг в авторизації",
    severity: "High",
    description: "Помилка при вході.",
  },
  {
    id: 2,
    title: "Баг в реєстрації",
    severity: "Medium",
    description: "Некоректна робота форми.",
  },
  {
    id: 3,
    title: "Баг в кошику",
    severity: "Low",
    description: "Неправильне обчислення суми.",
  },
  {
    id: 4,
    title: "Баг в оплаті",
    severity: "High",
    description: "Помилка при обробці платежу.",
  },
  {
    id: 5,
    title: "Баг в відгуках",
    severity: "Low",
    description: "Невірне відображення відгуків.",
  },
  {
    id: 6,
    title: "Баг в звітах",
    severity: "Medium",
    description: "Некоректне формування звітів.",
  },
];

export default function AdminDashboard() {
  const { projects, isLoading } = useProjectsQuery();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          My Projects
        </Typography>
        {isLoading ? (
          <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
            Loading projects...
          </Typography>
        ) : projects && projects.length > 0 ? (
          <ExpandableCategory
            items={projects}
            renderItem={(project) => <ProjectItem project={project} />}
          />
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
            There's no projects in the system yet.
          </Typography>
        )}
      </Grid>

      <Grid item xs={12}>
        <ExpandableCategory
          title="Tests for my projects"
          items={dummyTests}
          renderItem={(test) => <TestItem test={test} />}
        />
      </Grid>

      <Grid item xs={12}>
        <ExpandableCategory
          title="Test cases for my projects"
          items={dummyTestCases}
          renderItem={(testCase) => <TestCaseItem testCase={testCase} />}
        />
      </Grid>

      <Grid item xs={12}>
        <ExpandableCategory
          title="Bug reports for my projects"
          items={dummyBugReports}
          renderItem={(bug) => <BugReportItem bug={bug} />}
        />
      </Grid>
    </Grid>
  );
}
