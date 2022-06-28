import { render, screen } from '@testing-library/react';
import React from 'react';
import { Project } from '../Project';
import ProjectCard from '../ProjectCard';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

describe('<ProjectCard />', () => {
  let project;
  let handleEdit;

  beforeEach(() => {
    project = new Project({
      id: 1,
      name: 'Mission Impossible',
      description: 'This is really difficult',
      budget: 100,
    });
    handleEdit = jest.fn();
  });

  const setup = () => {
    render(
      <MemoryRouter>
        <ProjectCard project={project} onEdit={handleEdit} />
      </MemoryRouter>
    );
  };

  test('should initially render', () => {
    setup();
  });

  test('renders project properly', () => {
    setup();
    expect(screen.getByRole('heading')).toHaveTextContent(project.name);
    screen.getByText(/this is really difficult\.\.\./i);
    screen.getByText(/budget : 100/i);
  });

  test('handler called when edit clicked', async () => {
    setup();
    // this query works screen.getByText(/edit/i)
    // but using role is better
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /edit/i }));

    expect(handleEdit).toBeCalledTimes(1);
    expect(handleEdit).toBeCalledWith(project);
  });

  test('snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ProjectCard project={project} onEdit={handleEdit} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
