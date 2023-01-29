import {TestBed} from '@angular/core/testing';
import {NgxPopperjsModule} from 'ngx-popperjs';
import {BuilderService, ElementService, NodeService} from '../classes';
import {BuilderComponent} from './builder.component';

describe('BuilderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPopperjsModule],
      declarations: [BuilderComponent],
      providers: [
        {
          provide: BuilderService,
          useValue: {},
        },
        {
          provide: NodeService,
          useValue: {},
        },
        {
          provide: ElementService,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
